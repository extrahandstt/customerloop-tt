import { Link } from "react-router-dom";

export default function CrmTrinidad() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      
      <h1>CRM Software Trinidad & Tobago</h1>

      <p>
        CustomerLoop TT is a CRM software built for small businesses in Trinidad & Tobago.
        It helps you track customers, manage interactions, and automate follow-ups.
      </p>

      <h2>Why businesses use CRM software</h2>

      <ul>
        <li>Stop losing customers after first visit</li>
        <li>Automate customer follow-ups</li>
        <li>Increase repeat sales</li>
      </ul>

      <h2>Built for local businesses</h2>
      <p>Barbers, salons, retail stores, restaurants, and service providers.</p>

      <Link to="/login">
        <button style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#f5c542",
          border: "none",
          borderRadius: "8px",
          fontWeight: "700"
        }}>
          Start Free Trial
        </button>
      </Link>
<div style={{ marginTop: "30px" }}>
  <h3>Explore More</h3>

  <a href="/crm-trinidad">CRM Software Trinidad</a><br />
  <a href="/customer-management-software-trinidad">
    Customer Management Software
  </a><br />
  <a href="/whatsapp-business-automation-trinidad">
    WhatsApp Automation TT
  </a>
</div>
    </div>
    
  );
}