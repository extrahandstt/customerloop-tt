import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#111" }}>

      {/* HERO */}
      <section style={{ padding: "70px 20px", textAlign: "center", background: "#172139", color: "white" }}>
        <button
  onClick={() => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
    } else {
      alert("Install option will appear in your browser menu (Add to Home Screen).");
    }
  }}
  style={{
    marginTop: "15px",
    padding: "12px 18px",
    borderRadius: "8px",
    border: "1px solid white",
    background: "transparent",
    color: "white",
    cursor: "pointer",
  }}
>
  📲 Download CustomerLoop
</button>
        <h1 style={{ fontSize: "44px", fontWeight: "800", marginBottom: "15px" }}>
          Stop Losing Customers After Their First Visit
        </h1>

        <p style={{ fontSize: "18px", maxWidth: "700px", margin: "0 auto", opacity: 0.9 }}>
          CustomerLoop TT helps small businesses automatically follow up with customers so they come back and buy again.
        </p>

        <div style={{ marginTop: "25px" }}>
          <Link to="/login">
            <button style={{
              padding: "14px 26px",
              background: "linear-gradient(135deg, #f5c542, #d4a017)",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer"
            }}>
              🚀 Start 14-Day Free Trial
              No credit card required • Full access included
            </button>
          </Link>
        </div>

        <p style={{ marginTop: "10px", fontSize: "12px", opacity: 0.7 }}>
          One-time setup • Built for small businesses in Trinidad & Tobago
        </p>
      </section>

      {/* PROBLEM */}
      <section style={{ padding: "60px 20px", background: "#f9fafb" }}>
        <h2 style={{ textAlign: "center", fontSize: "28px" }}>
          The Problem Most Businesses Don’t Notice
        </h2>

        <div style={{ maxWidth: "800px", margin: "30px auto", lineHeight: "1.8" }}>
          <p>❌ Customers visit once and never return</p>
          <p>❌ No system to remind you to follow up</p>
          <p>❌ Lost sales every single week</p>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ padding: "60px 20px" }}>
        <h2 style={{ textAlign: "center", fontSize: "28px" }}>
          CustomerLoop Fixes This Automatically
        </h2>

        <div style={{ maxWidth: "800px", margin: "30px auto", lineHeight: "1.8" }}>
          <p>✔ Add a customer once</p>
          <p>✔ System creates follow-up reminders</p>
          <p>✔ Get daily tasks of who to message</p>
          <p>✔ Send WhatsApp reminders in seconds</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "60px 20px", background: "#f9fafb" }}>
        <h2 style={{ textAlign: "center", fontSize: "28px" }}>
          How It Works
        </h2>

        <div style={{ maxWidth: "700px", margin: "30px auto", lineHeight: "1.8" }}>
          <p>1. Add your customer</p>
          <p>2. Set last interaction date</p>
          <p>3. System schedules follow-ups automatically</p>
          <p>4. You get reminders every day</p>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Built for Small Businesses</h2>
        <p style={{ marginTop: "10px", opacity: 0.7 }}>
          Barbers • Salons • Retail Stores • Car Washes • Freelancers • Service Providers
        </p>
      </section>

      {/* PRICING */}
      <section style={{ padding: "60px 20px", background: "#18233d", color: "white", textAlign: "center" }}>
        <h2>Lifetime Early Access</h2>

        <div style={{
          marginTop: "20px",
          display: "inline-block",
          padding: "25px",
          border: "2px solid #f5c542",
          borderRadius: "10px"
        }}>
          <h1 style={{ fontSize: "40px" }}>$249 TTD</h1>
          <p>One-time payment — no monthly fees</p>

          <div style={{ textAlign: "left", marginTop: "15px", lineHeight: "1.8" }}>
            <p>✔ Unlimited customers</p>
            <p>✔ Follow-up automation</p>
            <p>✔ WhatsApp reminders</p>
            <p>✔ All future updates</p>
          </div>

          <Link to="/login">
            <button style={{
              marginTop: "20px",
              padding: "12px 20px",
              background: "#f5c542",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer"
            }}>
              Get Access Now
            </button>
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Start Recovering Lost Customers Today</h2>
        <p style={{ opacity: 0.7 }}>
          Stop guessing. Start following up automatically.
        </p>

        <Link to="/login">
          <button style={{
            marginTop: "20px",
            padding: "14px 26px",
            background: "linear-gradient(135deg, #f5c542, #d4a017)",
            border: "none",
            borderRadius: "8px",
            fontWeight: "700",
            cursor: "pointer"
          }}>
            🚀 Get Started
          </button>
        </Link>
        <footer style={{ padding: "30px", textAlign: "center", fontSize: "12px", color: "#777" }}>
  <p>CustomerLoop TT © {new Date().getFullYear()}</p>

  <div style={{ marginTop: "10px" }}>
    <a href="/privacy" style={{ marginRight: "10px" }}>Privacy Policy</a>
    <a href="/refund" style={{ marginRight: "10px" }}>Refund Policy</a>
    <a href="/terms">Terms</a>
  </div>
</footer>
      </section>

          </div>
  );
}