import { Link } from "react-router-dom";

export default function CustomerManagementTrinidad() {
  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      <h1>Customer Management Software Trinidad & Tobago</h1>

      <p>
        CustomerLoop TT is customer management software designed for small businesses in Trinidad & Tobago.
        It helps you store customer data, track interactions, and improve repeat sales.
      </p>

      <h2>Why customer management matters</h2>

      <ul>
        <li>Keep track of every customer</li>
        <li>Never forget follow-ups</li>
        <li>Increase repeat business</li>
      </ul>

      <h2>Built for local businesses</h2>
      <p>Salons, barbers, retail stores, restaurants, and service providers.</p>

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