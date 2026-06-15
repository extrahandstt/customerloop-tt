import { Helmet } from "react-helmet-async";

export default function Updates() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>

      <Helmet>
        <title>Updates | CustomerLoop TT</title>
        <meta
          name="description"
          content="Latest updates, improvements, and new features in CustomerLoop TT."
        />
      </Helmet>

      <h1>🚀 Product Updates</h1>

      <p style={{ color: "#666" }}>
        See what's new in CustomerLoop TT.
      </p>

      <div style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>

        {/* UPDATE CARD */}
        <div style={{
          border: "1px solid #eee",
          borderRadius: "10px",
          padding: "15px"
        }}>
          <h3>📦 Bulk Customer Import Added</h3>
          <p>
            You can now paste or upload multiple customers at once.
          </p>
          <small style={{ color: "#888" }}>
            June 2026
          </small>
        </div>

        <div style={{
          border: "1px solid #eee",
          borderRadius: "10px",
          padding: "15px"
        }}>
          <h3>📲 WhatsApp Automation Improved</h3>
          <p>
            Follow-up messages are now faster and more reliable.
          </p>
          <small style={{ color: "#888" }}>
            June 2026
          </small>
        </div>

      </div>

    </div>
  );
}