import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import { ui } from "../styles/ui";



export default function FollowUps() {
  
  const [overdue, setOverdue] = useState([]);
  const [today, setToday] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
const [bulkMode, setBulkMode] = useState(false);
const [currentBulkIndex, setCurrentBulkIndex] = useState(0);

  useEffect(() => {
    fetchTasks();
  }, []);

  const toggleSelect = (taskId) => {
  setSelectedTasks((prev) =>
    prev.includes(taskId)
      ? prev.filter((id) => id !== taskId)
      : [...prev, taskId]
  );
};
const btn = {
  padding: "8px 10px",
  borderRadius: "8px",
  border: "none",
  background: "#374151",
  color: "white",
  fontSize: "12px",
  cursor: "pointer",
};
  const fetchTasks = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const todayDate = new Date().toISOString().split("T")[0];

    const { data } = await supabase
      .from("follow_up_tasks")
      .select(`
  *,
  customers(*),
  follow_up_rules(*)
`)
      .eq("user_id", user.id)
      .eq("status", "pending")
      .order("due_date", { ascending: true });

    if (!data) return;

    const overdueList = [];
    const todayList = [];
    const upcomingList = [];

    data.forEach((task) => {
      if (task.due_date < todayDate) {
        overdueList.push(task);
      } else if (task.due_date === todayDate) {
        todayList.push(task);
      } else {
        upcomingList.push(task);
      }
    });

    setOverdue(overdueList);
    setToday(todayList);
    setUpcoming(upcomingList);
  };

  const sendWhatsApp = async (task) => {
  const phone = task.customers.phone;

  const message = encodeURIComponent(
    task.follow_up_rules?.message_template?.replace(
      "{name}",
      task.customers.name
    ) || ""
  );

  window.open(
    `https://wa.me/${phone}?text=${message}`,
    "_blank"
  );

  await supabase
    .from("follow_up_tasks")
    .update({
      status: "completed",
    })
    .eq("id", task.id);

  fetchTasks();
};

  const completeTask = async (id) => {
  await supabase
    .from("follow_up_tasks")
    .update({ status: "completed" })
    .eq("id", id);

  fetchTasks();
};

  const snoozeTask = async (task, days) => {
    const newDate = new Date(task.due_date);
    newDate.setDate(newDate.getDate() + days);

    await supabase
      .from("follow_up_tasks")
      .update({
        due_date: newDate.toISOString().split("T")[0],
      })
      .eq("id", task.id);

    fetchTasks();
  };
const getStyle = (task) => {
  const today = new Date().toISOString().split("T")[0];

  if (task.due_date < today) return { border: "2px solid red" };
  if (task.due_date === today) return { border: "2px solid orange" };
  return { border: "1px solid #ccc" };
};
  const TaskCard = ({
  task,
  bulkMode,
  selectedTasks,
  toggleSelect,
}) => (
  <div
    className="card"
    style={{
      borderLeft:
        task.due_date <
        new Date().toISOString().split("T")[0]
          ? "4px solid #ef4444"
          : task.due_date ===
            new Date().toISOString().split("T")[0]
          ? "4px solid #f59e0b"
          : "4px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    }}
  >
    {bulkMode && (
      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input
          type="checkbox"
          checked={selectedTasks.includes(task.id)}
          onChange={() => toggleSelect(task.id)}
        />
        Select
      </label>
    )}

    <h3 style={{ margin: 0 }}>{task.customers.name}</h3>

    <span
      style={{
        background: "#eef2ff",
        color: "#4338ca",
        padding: "3px 8px",
        borderRadius: "999px",
        fontSize: "11px",
        width: "fit-content",
      }}
    >
      {task.follow_up_rules?.name}
    </span>

    <p style={{ fontSize: "13px", margin: 0 }}>
      {task.follow_up_rules?.message_template}
    </p>

    <p style={{ fontSize: "12px", color: "#666" }}>
      Due: {task.due_date}
    </p>

    {/* ACTION GRID (MOBILE SAFE) */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
        gap: "6px",
      }}
    >
      <button onClick={() => sendTemplateMessage(task)}>
        Send
      </button>

      <button onClick={() => completeTask(task.id)}>
        Done
      </button>

      <button onClick={() => snoozeTask(task, 1)}>
        +1d
      </button>

      <button onClick={() => snoozeTask(task, 3)}>
        +3d
      </button>
    </div>
  </div>
);
const sendTemplateMessage = (task) => {
  const phone = task.customers.phone.replace(/\D/g, "");

  const message = task.follow_up_rules?.message_template
    ?.replace("{name}", task.customers.name)
    ?.replace("{business}", "Your Business Name");

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  );
};
const sendSelectedWhatsApps = () => {
  const allTasks = [...overdue, ...today, ...upcoming];

  const selected = allTasks.filter((task) =>
    selectedTasks.includes(task.id)
  );

  selected.forEach((task) => {
    const phone = task.customers?.phone?.replace(/\D/g, "");

    const message =
      task.follow_up_rules?.message_template
        ?.replace("{name}", task.customers.name)
        ?.replace("{business}", "Your Business Name") || "";

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  });
};
const sendNextSelected = () => {
  const allTasks = [...overdue, ...today, ...upcoming];

  const selected = allTasks.filter((task) =>
    selectedTasks.includes(task.id)
  );

  if (selected.length === 0) {
    alert("No tasks selected");
    return;
  }

  const task = selected[currentBulkIndex];

  if (!task) {
    alert("All selected customers contacted");
    setCurrentBulkIndex(0);
    return;
  }

  const phone = task.customers.phone.replace(/\D/g, "");

  const message =
    task.follow_up_rules?.message_template
      ?.replace("{name}", task.customers.name)
      ?.replace("{business}", "Your Business Name");

  window.open(
    `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
    "_blank"
  );

  setCurrentBulkIndex((prev) => prev + 1);
};
  return (
    <div className="page" style={{ paddingBottom: "80px" }}>
      <Helmet>
    <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
    <meta
      name="description"
      content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
    />
  </Helmet>
  
      <Navbar />
      <div
  style={{
    padding: "20px",
    borderRadius: "12px",
    background: "#202c4a",
    color: "white",
    marginBottom: "18px",
  }}
>
  <h1 style={{ margin: 0, fontSize: "22px" }}>
    Follow-ups
  </h1>

  <p style={{ marginTop: "8px", fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
    Daily tasks to reconnect with customers and drive repeat business.
  </p>
</div>
<div className="card">
  <h2>Today's Customer Actions</h2>

  <h1>
    {overdue.length + today.length}
  </h1>

  <p>
    Customers to contact today
  </p>
</div>

      <div>

  {/* 🔘 BULK ACTION CONTROL (TOP LEVEL) */}
  <div
  style={{
    position: "sticky",
    top: "0",
    zIndex: 20,
    background: "#ffffff",
    padding: "10px",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  }}
>
  <div>
    <strong style={{ fontSize: "14px" }}>
      {bulkMode
        ? `Select Mode (${selectedTasks.length} selected)`
        : "Follow-ups"}
    </strong>
  </div>

  <button
    onClick={() => setBulkMode(!bulkMode)}
    style={{
      padding: "10px 14px",
      borderRadius: "999px",
      border: "none",
      background: bulkMode ? "#ef4444" : "#111827",
      color: "white",
      fontSize: "13px",
      cursor: "pointer",
      minWidth: "120px",
    }}
  >
    {bulkMode ? "Exit Select" : "Select Multiple"}
  </button>
</div>

  <hr />

  {/* 🚨 OVERDUE */}
  <h2 style={{ color: "#ef4444" }}>🚨 Overdue</h2>
  {overdue.length === 0 && <p>None</p>}

  {overdue.map((task) => (
    <TaskCard
      key={task.id}
      task={task}
      bulkMode={bulkMode}
      selectedTasks={selectedTasks}
      toggleSelect={toggleSelect}
    />
  ))}

  {/* 📅 TODAY */}
  <h2 style={{ color: "#f59e0b" }}>📅 Today</h2>
  {today.length === 0 && <p>Nothing due today</p>}

  {today.map((task) => (
    <TaskCard
      key={task.id}
      task={task}
      bulkMode={bulkMode}
      selectedTasks={selectedTasks}
      toggleSelect={toggleSelect}
    />
  ))}

  {/* ⏳ UPCOMING */}
  <h2 style={{ color: "#3b82f6" }}>⏳ Upcoming</h2>
  {upcoming.length === 0 && <p>No upcoming tasks</p>}

  {upcoming.map((task) => (
    <TaskCard
      key={task.id}
      task={task}
      bulkMode={bulkMode}
      selectedTasks={selectedTasks}
      toggleSelect={toggleSelect}
    />
  ))}

</div>
{bulkMode && selectedTasks.length > 0 && (
  <div
    style={{
      position: "fixed",
      bottom: "0",
      left: "0",
      right: "0",
      background: "#111827",
      color: "white",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "8px",
      zIndex: 50,
      flexWrap: "wrap",
    }}
  >
    <div>
  <div style={{ fontSize: "13px", fontWeight: "600" }}>
    {selectedTasks.length} selected
  </div>

  <div
    style={{
      fontSize: "12px",
      color: "#d1d5db",
      marginTop: "2px",
    }}
  >
    {Math.min(
      currentBulkIndex + 1,
      selectedTasks.length
    )}
    {" / "}
    {selectedTasks.length}
  </div>
</div>

    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
      <button
  style={btn}
  onClick={sendNextSelected}
>
  Send Next
</button>

      <button
        onClick={() => alert("Complete all selected")}
        style={btn}
      >
        Complete
      </button>

      <button
        onClick={() => setSelectedTasks([])}
        style={btn}
      >
        Clear
      </button>
    </div>
  </div>
)}
    </div>
    
  );
  
}