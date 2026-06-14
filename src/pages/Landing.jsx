import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Landing() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#070707" }}>

      {/* SEO MUST BE INSIDE COMPONENT */}
      <Helmet>
        <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
        <meta
          name="description"
          content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
        />
      </Helmet>

      {/* HERO */}
      <section
        style={{
          padding: "clamp(50px, 10vw, 90px) 20px",
          textAlign: "center",
          background: "#172139",
          color: "white"
        }}
      >
        <button
          onClick={() => {
            if (window.deferredPrompt) {
              window.deferredPrompt.prompt();
            } else {
              alert("Install option will appear in your browser menu.");
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

        <h1 style={{
          fontSize: "clamp(28px, 6vw, 44px)",
          fontWeight: "800",
          marginBottom: "15px",
          lineHeight: "1.2"
        }}>
          Stop Losing Customers After Their First Visit
        </h1>

        <p style={{
          fontSize: "clamp(14px, 3.5vw, 18px)",
          maxWidth: "700px",
          margin: "0 auto",
          opacity: 0.95,
          lineHeight: "1.5"
        }}>
          CustomerLoop TT is a CRM software for small businesses in Trinidad & Tobago that helps you track customers, automate follow-ups, and increase repeat sales.
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
            </button>
          </Link>
        </div>
      </section>

      {/* PROBLEM */}
<section
  style={{
    padding: "60px 20px",
    background: "#172139",
    color: "#ffffff",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "clamp(24px, 6vw, 34px)",
      fontWeight: "800",
      lineHeight: "1.3",
      marginBottom: "20px",
      color: "#ffffff",
    }}
  >
    The Problem Most Businesses Don’t Notice
  </h2>

  <div
    style={{
      maxWidth: "800px",
      margin: "30px auto",
      lineHeight: "1.8",
      fontSize: "clamp(16px, 3vw, 18px)",
    }}
  >
    <p>❌ Customers visit once and never return</p>
    <p>❌ No system to follow up with customers</p>
    <p>❌ Lost sales every week</p>
  </div>
</section>

{/* SOLUTION */}
<section style={{ padding: "60px 20px", background: "#ffffff" }}>
  <h2
    style={{
      textAlign: "center",
      fontSize: "clamp(24px, 6vw, 34px)",
      fontWeight: "800",
      lineHeight: "1.3",
      marginBottom: "20px",
      color: "#111111",
    }}
  >
    CustomerLoop Fixes This Automatically
  </h2>

  <div
    style={{
      maxWidth: "800px",
      margin: "30px auto",
      lineHeight: "1.8",
      fontSize: "clamp(16px, 3vw, 18px)",
      color: "#333333",
    }}
  >
    <p>✔ Add a customer once</p>
    <p>✔ Get automatic follow-up reminders</p>
    <p>✔ Track all customers in one place</p>
    <p>✔ Send WhatsApp reminders easily</p>
  </div>
</section>

{/* HOW IT WORKS */}
<section
  style={{
    padding: "60px 20px",
    background: "#172139",
    color: "#ffffff",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "clamp(24px, 6vw, 34px)",
      fontWeight: "800",
      lineHeight: "1.3",
      marginBottom: "20px",
      color: "#ffffff",
    }}
  >
    How It Works
  </h2>

  <div
    style={{
      maxWidth: "700px",
      margin: "30px auto",
      lineHeight: "1.8",
      fontSize: "clamp(16px, 3vw, 18px)",
    }}
  >
    <p>1. Add customer</p>
    <p>2. Set follow-up timing</p>
    <p>3. Get daily reminders</p>
  </div>
</section>

{/* WHO IT'S FOR */}
<section
  style={{
    padding: "60px 20px",
    textAlign: "center",
    background: "#ffffff",
  }}
>
  <h2
    style={{
      fontSize: "clamp(24px, 6vw, 34px)",
      fontWeight: "800",
      lineHeight: "1.3",
      marginBottom: "20px",
      color: "#111111",
    }}
  >
    Built for Small Businesses
  </h2>

  <p
    style={{
      fontSize: "clamp(16px, 3vw, 18px)",
      color: "#333333",
      lineHeight: "1.8",
    }}
  >
    Barbers • Salons • Shops • Car Washes • Freelancers • Service Providers
  </p>
</section>

      {/* PRICING */}
      <section style={{ padding: "60px 20px", background: "#18233d", color: "white", textAlign: "center" }}>
        <h2>Lifetime Access</h2>

        <div style={{
          marginTop: "20px",
          display: "inline-block",
          padding: "25px",
          border: "2px solid #f5c542",
          borderRadius: "10px"
        }}>
          <h1>$249 TTD</h1>
          <p>One-time payment</p>

          <div style={{ textAlign: "left", marginTop: "15px" }}>
            <p>✔ Unlimited customers</p>
            <p>✔ Follow-up automation</p>
            <p>✔ WhatsApp reminders</p>
          </div>

          <Link to="/login">
            <button style={{
              marginTop: "20px",
              padding: "12px 20px",
              background: "#f5c542",
              border: "none",
              borderRadius: "8px",
              fontWeight: "700"
            }}>
              Get Access
            </button>
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>Start Recovering Lost Customers Today</h2>

        <Link to="/login">
          <button style={{
            marginTop: "20px",
            padding: "14px 26px",
            background: "linear-gradient(135deg, #f5c542, #d4a017)",
            border: "none",
            borderRadius: "8px",
            fontWeight: "700"
          }}>
            Get Started
          </button>
        </Link>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "30px", textAlign: "center", fontSize: "12px", color: "#777" }}>
        <p>CustomerLoop TT © {new Date().getFullYear()}</p>

        <div>
          <a href="/privacy-policy">Privacy Policy</a> |{" "}
          <a href="/refund-policy">Refund Policy</a> |{" "}
          <a href="/terms">Terms</a>
        </div>
      </footer>

    </div>
  );
}