import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      
      <Helmet>
        <title>Pricing | CustomerLoop TT CRM Software</title>
        <meta
          name="description"
          content="Simple pricing for CustomerLoop TT CRM system. One-time or affordable plans for small businesses in Trinidad."
        />
      </Helmet>

      <h1>Simple Pricing</h1>

      <p>No monthly fees. No stress. Built for small businesses.</p>

      <div style={{
        border: "2px solid #ddd",
        padding: "20px",
        marginTop: "20px",
        borderRadius: "10px"
      }}>
        <h2>Lifetime Access</h2>
        <h1>$249 TTD</h1>

        <ul style={{ textAlign: "left" }}>
          <li>Unlimited customers</li>
          <li>Follow-up system</li>
          <li>WhatsApp reminders</li>
          <li>CRM dashboard</li>
        </ul>

        <Link to="/login">
          <button style={{
            marginTop: "20px",
            padding: "12px 20px",
            background: "#f5c542",
            border: "none",
            borderRadius: "8px"
          }}>
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}