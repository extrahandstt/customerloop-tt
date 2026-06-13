import { Helmet } from "react-helmet-async";

<Helmet>
  <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
  <meta
    name="description"
    content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
  />
</Helmet>
export default function PrivacyPolicy() {
  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto", lineHeight: "1.6" }}>
      <h1>Privacy Policy</h1>

      <p>
        CustomerLoop TT respects your privacy and is committed to protecting your personal data.
      </p>

      <h3>Information We Collect</h3>
      <p>
        We collect basic account information such as name, business details, and customer data you enter into the system.
      </p>

      <h3>How We Use Your Data</h3>
      <p>
        Your data is used only to provide follow-up reminders, customer tracking, and app functionality.
        We do not sell or share your data with third parties.
      </p>

      <h3>Data Storage</h3>
      <p>
        Data is securely stored using Supabase cloud infrastructure.
      </p>

      <h3>Contact</h3>
      <p>
        If you have questions, contact us at  LeDeDigital@outlook.com
      </p>
    </div>
  );
}