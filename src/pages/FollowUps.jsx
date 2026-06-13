import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
  <meta
    name="description"
    content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
  />
</Helmet>

export default function FollowUps() {
  const [overdue, setOverdue] = useState([]);
  const [today, setToday] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
const [bulkMode, setBulkMode] = useState(false);

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
      .eq("id", task.id);

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
    <div style={getStyle(task)} className="card">
      {bulkMode && (
  <input
    type="checkbox"
    checked={selectedTasks.includes(task.id)}
    onChange={() => toggleSelect(task.id)}
    style={{
      marginBottom: "10px",
      width: "18px",
      height: "18px",
    }}
  />
)}
      <h3>{task.customers.name}</h3>
<span
  style={{
    background: "#ebd569",
    padding: "4px 8px",
    borderRadius: "20px",
    fontSize: "12px",
  }}
>
  Campaign
</span>
<p>
  📩 <strong>{task.follow_up_rules?.name}</strong>
</p>

<p>
  {task.follow_up_rules?.message_template}
</p>

<p>
  Due: {task.due_date}
</p>
      <button onClick={() => sendTemplateMessage(task)}>
  Send {task.follow_up_rules?.name}
</button>

      <button onClick={() => completeTask(task.id)} style={{ marginLeft: "10px" }}>
        Complete
      </button>

      <button onClick={() => snoozeTask(task, 1)} style={{ marginLeft: "10px" }}>
        +1 Day
      </button>

      <button onClick={() => snoozeTask(task, 3)} style={{ marginLeft: "10px" }}>
        +3 Days
      </button>

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
  return (
    <div className="page">
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
  <button onClick={() => setBulkMode(!bulkMode)}>
    {bulkMode ? "Cancel Select" : "Select Multiple"}
  </button>

  <hr />

  {/* 🚨 OVERDUE */}
  <h2>Overdue</h2>
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
  <h2>Today's Tasks</h2>
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
  <h2>Upcoming</h2>
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
    </div>
    
  );
  
}