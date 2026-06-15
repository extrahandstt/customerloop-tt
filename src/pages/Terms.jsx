import { Helmet } from "react-helmet-async";


export default function Terms() {
  

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto", lineHeight: "1.6" }}>
      <Helmet>
    <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
    <meta
      name="description"
      content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
    />
  </Helmet>
  
      <h1>Terms of Service</h1>

      <p>
        By using CustomerLoop TT, you agree to use the platform responsibly for legitimate business purposes.
      </p>

      <h3>Usage</h3>
      <p>
        You may not misuse the system for spam or illegal messaging.
      </p>

      <h3>Account</h3>
      <p>
        You are responsible for maintaining your account and data.
      </p>

      <h3>Changes</h3>
      <p>
        We may update features and pricing as the product evolves.
      </p>
    </div>
  );
}