import { Helmet } from "react-helmet-async";

export default function CrmTrinidad() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      
      {/* SEO */}
      <Helmet>
        <title>CRM Software Trinidad | CustomerLoop TT</title>
        <meta
          name="description"
          content="CustomerLoop TT is CRM software for small businesses in Trinidad. Track customers, automate WhatsApp follow-ups, and increase repeat sales easily."
        />
      </Helmet>

      {/* PAGE CONTENT */}
      <h1>CRM Software for Small Businesses in Trinidad</h1>

      <p>
        CustomerLoop TT is a simple CRM software built for small businesses in Trinidad and Tobago. 
        Many businesses lose customers after the first visit because there is no system to track them or follow up.
      </p>

      <p>
        This CRM helps you store customer details, set follow-up reminders, and send WhatsApp messages 
        so you can bring customers back and increase repeat sales automatically.
      </p>

      <h2>Why Small Businesses Lose Customers</h2>
      <p>
        Most small businesses in Trinidad rely on memory or WhatsApp chats to manage customers. 
        This leads to missed follow-ups, lost leads, and customers forgetting to return.
      </p>

      <p>
        Without a CRM system, business owners cannot track who visited, when they should follow up, 
        or what message to send next.
      </p>

      <h2>How CustomerLoop Fixes This</h2>
      <ul>
        <li>Track customer visits</li>
        <li>Set follow-up reminders</li>
        <li>Send WhatsApp messages</li>
        <li>Increase repeat sales automatically</li>
      </ul>

      <h2>Why Follow-Ups Matter</h2>
      <p>
        Businesses lose customers because there is no follow-up system. Customers often forget or get distracted, 
        and without reminders, they never return.
      </p>

      <p>
        WhatsApp reminders increase return visits because messaging is fast, direct, and personal.
      </p>

      <h2>Features</h2>
      <ul>
        <li>Customer tracking system</li>
        <li>Automated follow-up reminders</li>
        <li>WhatsApp messaging support</li>
        <li>Daily task reminders</li>
        <li>Simple CRM dashboard</li>
      </ul>

      <h2>Start Using CustomerLoop TT</h2>
      <p>
        Start organizing your customers and increasing repeat sales automatically.
      </p>

      <a href="/signup">
        <button style={{ padding: "10px 15px", cursor: "pointer" }}>
          Start Free Trial
        </button>
      </a>

      <hr />

      {/* INTERNAL LINKS */}
      <p>
        <a href="/whatsapp-business-automation-trinidad">
          WhatsApp Automation Trinidad
        </a>
        {" | "}
        <a href="/customer-management-trinidad">
          Customer Management Software
        </a>
        {" | "}
        <a href="/business-growth-trinidad">Back to Business Hub</a>
        <a href="/">
          Home
        </a>
      </p>

    </div>
  );
}