import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { ui } from "../styles/ui";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const linkStyle = (path) => ({
    padding: "10px 12px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    background: isActive(path) ? "#111827" : "transparent",
    color: isActive(path) ? "white" : "#374151",
    display: "block",
  });

  return (
    <div style={{
      borderBottom: "1px solid #e5e7eb",
      background: "white",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>

      {/* TOP BAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px"
      }}>

        {/* BRAND */}
        <div
          onClick={() => navigate("/dashboard")}
          style={{
            fontWeight: "700",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          <div
  onClick={() => navigate("/dashboard")}
  style={{
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "18px",
    color: "#111827",
  }}
>
  🔄 CustomerLoop TT
</div>
        </div>

        {/* DESKTOP NAV */}
        <div className="desktop-nav" style={{
          display: "flex",
          gap: "8px",
          background: "#f3f4f6",
          padding: "6px",
          borderRadius: "10px"
        }}>
          <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
          <Link to="/customers" style={linkStyle("/customers")}>Customers</Link>
          <Link to="/followups" style={linkStyle("/followups")}>Follow Ups</Link>
          <Link to="/rules" style={linkStyle("/rules")}>Campaigns</Link>
        </div>

        {/* HAMBURGER BUTTON (MOBILE) */}
        <button
  onClick={() => setOpen(!open)}
  style={{
    fontSize: "22px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#111827",
    display: "block"
  }}
  className="hamburger"
>
  ☰
</button>

        {/* DESKTOP ACTIONS */}
<div
  className="desktop-actions"
  style={{
    display: "flex",
    gap: "10px",
    alignItems: "center",
  }}
>
  <Link
    to="/updates"
    style={{
      fontSize: "13px",
      color: "#6b7280",
      textDecoration: "none",
      fontWeight: "600",
    }}
  >
    Updates
  </Link>

  <button
    onClick={logout}
    style={{
      background: "#111827",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Logout
  </button>
</div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div style={{
          padding: "10px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          borderTop: "1px solid #e5e7eb",
          background: "white"
        }}>

          <Link to="/dashboard" onClick={() => setOpen(false)} style={linkStyle("/dashboard")}>Dashboard</Link>
          <Link to="/customers" onClick={() => setOpen(false)} style={linkStyle("/customers")}>Customers</Link>
          <Link to="/followups" onClick={() => setOpen(false)} style={linkStyle("/followups")}>Follow Ups</Link>
          <Link to="/rules" onClick={() => setOpen(false)} style={linkStyle("/rules")}>Campaigns</Link>
          <Link to="/updates" onClick={() => setOpen(false)} style={linkStyle("/updates")}>Updates</Link>
<button
  onClick={logout}
  style={{
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "600",
  }}
>
  Logout
</button>
        </div>
      )}

      {/* MOBILE CSS */}
      <style>
        {`
          @media (max-width: 768px) {
  .desktop-nav {
    display: none !important;
  }

  .desktop-actions {
    display: none !important;
  }

  .hamburger {
    display: block !important;
    font-size: 28px;
    color: #111827;
    padding: 6px;
  }
}

@media (min-width: 769px) {
  .hamburger {
    display: none !important;
  }
}
        `}
      </style>

    </div>
  );
}