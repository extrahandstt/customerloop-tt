import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Helmet } from "react-helmet-async";
import { ui } from "../styles/ui";


export default function Login() {
  
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
const [businessName, setBusinessName] = useState("");
const [businessType, setBusinessType] = useState("");
  const handleAuth = async () => {

  if (isSignup) {

    if (!businessName?.trim()) {
      alert("Please enter your business name");
      return;
    }
if (!businessType) {
  alert("Please select a business type");
  return;
}
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
      const { error: profileError } = await supabase
  .from("business_profiles")
  .insert({
    user_id: data.user.id,
    business_name: businessName,
    business_type: businessType,
    trial_start: new Date().toISOString(),
  });
console.log("PROFILE ERROR:", profileError);

if (profileError) {
  alert(profileError.message);
  return;
}
    }

    alert("Account created successfully!");
  } else {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/dashboard");
  }
};
const startTrial = async (user) => {
  await supabase.from("business_profiles").upsert({
    user_id: user.id,
    trial_start: new Date().toISOString(),
  });
};
const isTrialActive = (trialStart) => {
  if (!trialStart) return false;

  const start = new Date(trialStart);
  const now = new Date();

  const diffDays =
    (now - start) / (1000 * 60 * 60 * 24);

  return diffDays <= 14;
};
  return (
    <div
  style={{
    minHeight: "100vh",
    display: "flex",
    flexWrap: "wrap",
  }}
>
      <Helmet>
  <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
  <meta
    name="description"
    content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
  />
</Helmet>

      {/* LEFT SIDE */}
      <div
  style={{
    flex: 1,
    minWidth: "320px",
    background: "#0f172a",
    color: "white",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }}
>
        <h1
  style={{
    fontSize: "clamp(32px, 6vw, 48px)",
    fontWeight: "800",
    color: "#fff",
  }}
>
  Customer Loop TT
</h1>
        <h2
  style={{
    fontSize: "clamp(18px,4vw,24px)",
    lineHeight: "1.5",
    color: "#cbd5e1",
  }}
>
  Never forget to follow up with a customer again
</h2>
        <p style={{ color: "#bdbdbd", lineHeight: "1.6" }}>
  Turn one-time customers into repeat buyers with automated follow-ups,
  WhatsApp reminders, and smart campaigns.
</p>

        <div style={styles.features}>
          <p>📩 WhatsApp follow-ups</p>
          <p>🔁 Repeat customer automation</p>
          <p>📊 Track interactions over time</p>
          <p>🏪 Built for retail, services & appointments</p>
        </div>

        <footer style={styles.footer}>
          © {new Date().getFullYear()} Customer Loop TT
        </footer>
      </div>

      {/* RIGHT SIDE */}
      <div
  style={{
    flex: 1,
    minWidth: "320px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
    padding: "20px",
  }}
>

        <div
  style={{
    ...ui.card,
    width: "100%",
    maxWidth: "420px",
  }}
>
          <h2 style={ui.sectionTitle}>
  {isSignup ? "Create Account" : "Login"}
</h2>
{isSignup && (
  <input
  style={ui.input}
    placeholder="Business Name"
    value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
      />
      
)}
{isSignup && (
  <select
  style={ui.select}
    value={businessType}
    onChange={(e) => setBusinessType(e.target.value)}
  >
    <option value="">Select Business Type</option>
    <option value="Retail">Retail</option>
    <option value="Restaurant">Restaurant</option>
    <option value="Salon">Salon</option>
    <option value="Auto Services">Auto Services</option>
    <option value="Professional Services">Professional Services</option>
    <option value="Other">Other</option>
  </select>
)}
          <input
  style={ui.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
  style={ui.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
  style={ui.button}
  onClick={handleAuth}
>
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <p
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup
              ? "Already have an account? Login"
              : "Create a new account"}
          </p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial",
  },

  left: {
  flex: 1,
  background: "#0b0b0b",
  color: "#ffffff",
  padding: "50px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
},

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f7f3f3",
  },

  card: {
    width: "300px",
    padding: "20px",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  logo: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  features: {
    marginTop: "20px",
    lineHeight: "1.8",
  },

  footer: {
    marginTop: "40px",
    fontSize: "12px",
    opacity: 0.6,
  },
};