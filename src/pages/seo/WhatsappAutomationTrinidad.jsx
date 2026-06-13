import { Link } from "react-router-dom";

export default function WhatsappAutomationTrinidad() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>WhatsApp Business Automation Trinidad & Tobago</h1>

      <p>
        CustomerLoop TT helps small businesses in Trinidad & Tobago automate WhatsApp follow-ups
        so they never miss a customer again.
      </p>

      <h2>What you can automate</h2>

      <ul>
        <li>Customer follow-up messages</li>
        <li>Reminder notifications</li>
        <li>Repeat customer campaigns</li>
      </ul>

      <h2>Why this matters</h2>
      <p>
        Most businesses lose customers simply because they forget to follow up.
        Automation fixes this instantly.
      </p>

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