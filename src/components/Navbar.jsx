import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 18px",
        borderBottom: "1px solid #e5e7eb",
        background: "white",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* LEFT NAV */}
      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/followups">Follow Ups</Link>
        <Link to="/rules">Campaigns</Link>
      </div>

      {/* RIGHT ACTIONS */}
      <button
        onClick={logout}
        style={{
          background: "#111",
          color: "white",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}