import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ui } from "../styles/ui";



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
const isTrialActive = (trialStart) => {
  if (!trialStart) return false;

  const start = new Date(trialStart);
  const today = new Date();

  const diffDays =
    (today - start) / (1000 * 60 * 60 * 24);

  return diffDays <= 14;
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
    <Helmet>
  <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
  <meta
    name="description"
    content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
  />
</Helmet>
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
    background:
"linear-gradient(135deg,#0f172a,#1e293b,#334155)",
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
    fontSize: "clamp(24px,5vw,34px)",
    fontWeight: "800",
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
    <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
    gap: "12px",
    marginBottom: "20px",
  }}
>

  <div className="card">
    <div style={{ fontSize: "12px", color: "#6b7280" }}>
      Customers
    </div>

    <div
      style={{
        fontSize: "32px",
        fontWeight: "700",
      }}
    >
      {stats.customers}
    </div>
  </div>

  <div
    className="card"
    style={{
      borderLeft: "4px solid #dc2626",
    }}
  >
    <div style={{ fontSize: "12px", color: "#6b7280" }}>
      Overdue
    </div>

    <div
      style={{
        fontSize: "32px",
        fontWeight: "700",
        color: "#dc2626",
      }}
    >
      {stats.overdue}
    </div>
  </div>

  <div
    className="card"
    style={{
      borderLeft: "4px solid #f59e0b",
    }}
  >
    <div style={{ fontSize: "12px", color: "#6b7280" }}>
      Today
    </div>

    <div
      style={{
        fontSize: "32px",
        fontWeight: "700",
        color: "#f59e0b",
      }}
    >
      {stats.today}
    </div>
  </div>

  <div
    className="card"
    style={{
      borderLeft: "4px solid #10b981",
    }}
  >
    <div style={{ fontSize: "12px", color: "#6b7280" }}>
      Upcoming
    </div>

    <div
      style={{
        fontSize: "32px",
        fontWeight: "700",
        color: "#10b981",
      }}
    >
      {stats.upcoming}
    </div>
  </div>

</div>
<div
  className="card"
  style={{
    marginBottom: "20px",
    background:
      stats.overdue > 0
        ? "#fef2f2"
        : stats.today > 0
        ? "#fffbeb"
        : "#ecfdf5",
  }}
>
  {stats.overdue > 0 ? (
    <strong>
      🚨 You have {stats.overdue} overdue follow-ups.
    </strong>
  ) : stats.today > 0 ? (
    <strong>
      📅 You have {stats.today} follow-ups due today.
    </strong>
  ) : (
    <strong>
      🎉 All customer follow-ups are up to date.
    </strong>
  )}
</div>
    {/* 🔵 ACTION GRID */}
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "20px",
  }}
>
  {/* CUSTOMERS */}
  <Link to="/customers" style={{ textDecoration: "none" }}>
    <div
      className="card"
      style={{
        cursor: "pointer",
        transition: "0.2s",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3>👥 Customers</h3>
      <p>Add and manage customer profiles</p>
    </div>
  </Link>

  {/* FOLLOW UPS */}
  <Link to="/followups" style={{ textDecoration: "none" }}>
    <div
      className="card"
      style={{
        cursor: "pointer",
        transition: "0.2s",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3>📅 Follow-ups</h3>
      <p>See who needs attention today</p>
    </div>
  </Link>

  {/* CAMPAIGNS */}
  <Link to="/rules" style={{ textDecoration: "none" }}>
    <div
      className="card"
      style={{
        cursor: "pointer",
        transition: "0.2s",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h3>📩 Campaigns</h3>
      <p>Automate customer messages</p>
    </div>
  </Link>
</div>
<div
  className="card"
  style={{
    marginTop: "20px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <div
        style={{
          fontWeight: "700",
        }}
      >
        🔔 Daily Reminders
      </div>

      <div
        style={{
          fontSize: "13px",
          color: "#6b7280",
        }}
      >
        Receive daily follow-up notifications.
      </div>
    </div>

    <input
      type="checkbox"
      checked={dailyReminders}
      onChange={toggleReminders}
      style={{
        width: "20px",
        height: "20px",
        accentColor: "#10b981",
      }}
    />
  </div>
</div>
<a
  href="https://wa.me/18687326795?text=Hi%20I%20need%20help%20with%20CustomerLoop%20TT"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    position: "fixed",
    bottom: "18px",
    right: "18px",
    background: "#25D366",
    color: "white",
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    zIndex: 9999,
    textDecoration: "none",
  }}
>
  💬
</a>
  </div>
);
  
}