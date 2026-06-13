import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
  <meta
    name="description"
    content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
  />
</Helmet>


export default function Dashboard() {
  const navigate = useNavigate();

const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate("/");
};
    const [showOnboarding, setShowOnboarding] = useState(
    !localStorage.getItem("seen_onboarding")
);
  const [stats, setStats] = useState({
    customers: 0,
    overdue: 0,
    today: 0,
    upcoming: 0,
  });
  const [businessName, setBusinessName] =
  useState("");
const [dailyReminders, setDailyReminders] = useState(
  localStorage.getItem("daily_reminders") === "true"
);


const toggleReminders = () => {
  const newValue = !dailyReminders;
  setDailyReminders(newValue);
  localStorage.setItem("daily_reminders", newValue);
};
  useEffect(() => {
    fetchStats();
  }, []);
  useEffect(() => {
  if ("Notification" in window) {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }
}, []);
useEffect(() => {
  const checkTrial = async () => {
    const { data: { user } } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("business_profiles")
      .select("trial_start")
      .eq("user_id", user.id)
      .single();

    if (!isTrialActive(data?.trial_start)) {
      alert("Your 14-day trial has ended. Please upgrade to continue.");
      navigate("/billing"); // or /login or /pay
    }
  };

  checkTrial();
}, []);
  const fetchStats = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const todayDate = new Date().toISOString().split("T")[0];

    const { data: customers } = await supabase
      .from("customers")
      .select("id")
      .eq("user_id", user.id);

    const { data: tasks } = await supabase
      .from("follow_up_tasks")
      .select("due_date")
      .eq("user_id", user.id)
      .eq("status", "pending");

    let overdue = 0;
    let today = 0;
    let upcoming = 0;

    tasks?.forEach((t) => {
      if (t.due_date < todayDate) overdue++;
      else if (t.due_date === todayDate) today++;
      else upcoming++;
    });

    setStats({
      customers: customers?.length || 0,
      overdue,
      today,
      upcoming,
    });
    const { data: profile } = await supabase
  .from("business_profiles")
  .select("*")
  .eq("user_id", user.id)
  .single();
if ("Notification" in window && Notification.permission === "granted") {
  const total = overdue + today;

  if (total > 0) {
    new Notification("Customer Loop - Daily Follow-ups", {
      body: `You have ${total} customers to follow up today.`,
      icon: "/logo.png", // optional (you can remove if you don't have one)
    });
  }
}
setBusinessName(
  profile?.business_name || ""
);
  };

  return (
  <div className="page">
    <div style={{
  background: "#fef3c7",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "15px"
}}>
  Your free trial is active. Enjoy full access for 14 days.
</div>
    {/* 🟢 HERO */}
    <div
  style={{
    padding: "26px 20px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #1c263a)",
    color: "white",
    marginBottom: "20px",
    position: "relative",
  }}
>
  <button
  onClick={handleLogout}
  style={{
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px",
  }}
>
  Logout
</button>
  <h1
    style={{
      margin: 0,
      fontSize: "24px",
      fontWeight: "700",
      letterSpacing: "0.2px",
    }}
    
  >
    Welcome{businessName ? `, ${businessName}` : ""} 👋
  </h1>

  <p
    style={{
      margin: "8px 0 0",
      fontSize: "14px",
      color: "rgba(255,255,255,0.75)",
    }}
  >
    {new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    })}
  </p>

  <p
    style={{
      margin: "10px 0 0",
      fontSize: "13px",
      color: "rgba(255,255,255,0.6)",
      maxWidth: "600px",
      lineHeight: "1.4",
    }}
  >
    Manage customers, track follow-ups, and automate return campaigns in one place.
  </p>
  
</div>
    {/* 🟡 TODAY INTELLIGENCE (ONLY ONE BLOCK) */}
    <div className="card" style={{ marginBottom: "20px" }}>
      <h2>Today’s Overview</h2>

      <p>
        👥 Customers: <strong>{stats.customers}</strong>
      </p>

      <p>
        🚨 Overdue: <strong>{stats.overdue}</strong>
      </p>

      <p>
        📅 Today: <strong>{stats.today}</strong>
      </p>

      <p>
        ⏳ Upcoming: <strong>{stats.upcoming}</strong>
      </p>

      <hr />

      {/* SMART MESSAGE */}
      {stats.overdue > 0 ? (
        <p style={{ color: "#b91c1c", fontWeight: "600" }}>
          You should start with overdue follow-ups today.
        </p>
      ) : stats.today > 0 ? (
        <p style={{ color: "#92400e", fontWeight: "600" }}>
          Focus on today’s follow-ups.
        </p>
      ) : (
        <p style={{ color: "#166534", fontWeight: "600" }}>
          🎉 You're all caught up.
        </p>
      )}
    </div>

    {/* 🔵 ACTION GRID */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "15px",
      }}
    >
      <Link to="/customers" style={{ textDecoration: "none" }}>
        <div className="card" style={{ cursor: "pointer" }}>
          <h3>👥 Customers</h3>
          <p>Add and manage customer profiles</p>
        </div>
      </Link>

      <Link to="/followups" style={{ textDecoration: "none" }}>
        <div className="card" style={{ cursor: "pointer" }}>
          <h3>📅 Follow-ups</h3>
          <p>See who needs attention today</p>
        </div>
      </Link>

      <Link to="/rules" style={{ textDecoration: "none" }}>
        <div className="card" style={{ cursor: "pointer" }}>
          <h3>📩 Campaigns</h3>
          <p>Automate customer messages</p>
        </div>
      </Link>
    </div>
<div
  style={{
    marginTop: "25px",
    paddingTop: "15px",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <div>
    <div style={{ fontSize: "12px", color: "#6b7280" }}>
      System preferences
    </div>

    <div style={{ fontSize: "13px", fontWeight: "600" }}>
     🔔 Daily reminders
    </div>
  </div>

  <input
    type="checkbox"
    checked={dailyReminders}
    onChange={toggleReminders}
    style={{
      width: "18px",
      height: "18px",
      cursor: "pointer",
      accentColor: "#10b981",
    }}
  />
</div>
  </div>
);
  
}