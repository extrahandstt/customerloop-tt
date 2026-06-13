import { Helmet } from "react-helmet-async";

export default function BusinessHubTrinidad() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      
      <Helmet>
        <title>Business Growth Tools Trinidad | CRM, Customer Management & WhatsApp Automation</title>
        <meta
          name="description"
          content="Learn how small businesses in Trinidad grow using CRM software, customer management systems, and WhatsApp automation tools."
        />
      </Helmet>

      <h1>Business Growth Tools for Small Businesses in Trinidad</h1>

      <p>
        Small businesses in Trinidad struggle with customer retention, follow-ups, and organizing customer data. 
        This hub connects all the tools needed to fix that and grow your business faster.
      </p>

      {/* CRM SECTION */}
      <h2>CRM Software</h2>
      <p>
        A CRM system helps you track customers, manage follow-ups, and increase repeat sales automatically.
      </p>

      <a href="/crm-trinidad">
        Learn about CRM Software in Trinidad →
      </a>

      {/* CUSTOMER MANAGEMENT SECTION (NEW ADDED) */}
      <h2>Customer Management System</h2>
      <p>
        A customer management system helps you store customer details, track interactions, and organize your contacts in one place.
      </p>

      <a href="/customer-management-trinidad">
        Learn about Customer Management in Trinidad →
      </a>

      {/* WHATSAPP SECTION */}
      <h2>WhatsApp Automation</h2>
      <p>
        WhatsApp automation helps businesses send reminders and follow-ups automatically, increasing repeat sales and customer retention.
      </p>

      <a href="/whatsapp-business-automation-trinidad">
        Learn about WhatsApp Automation →
      </a>

      {/* WHY THIS MATTERS */}
      <h2>Why This Matters</h2>
      <p>
        Businesses that follow up consistently and organize customer data properly make more money because customers return more often.
      </p>

      {/* SOLUTION BLOCK */}
      <h2>CustomerLoop TT Solution</h2>
      <p>
        CustomerLoop TT combines CRM, customer management, and WhatsApp automation into one simple system built for small businesses in Trinidad.
      </p>

      <a href="/signup">
        <button style={{ padding: "10px 15px", cursor: "pointer" }}>
          Start Free Trial
        </button>
      </a>

    </div>
  );
}