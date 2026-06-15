export const ui = {
  page: {
    padding: "16px",
    background: "#f9fafb",
    minHeight: "100vh",
  },

  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "12px",
  },

  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "6px",
    marginTop: "6px",
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  primaryButton: {
    padding: "10px",
    background: "#111827",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  dangerButton: {
    background: "#dc2626",
    color: "white",
  },
  navbar: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 16px",
  background: "#ffffff",
  borderBottom: "1px solid #e5e7eb",
  position: "sticky",
  top: 0,
  zIndex: 100,
},

navLinks: {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
},

navLink: {
  textDecoration: "none",
  color: "#374151",
  fontWeight: "600",
  padding: "8px 12px",
  borderRadius: "8px",
},

dashboardGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
  marginTop: "20px",
},

statCard: {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
},

statNumber: {
  fontSize: "32px",
  fontWeight: "700",
  color: "#111827",
},

statLabel: {
  color: "#6b7280",
  fontSize: "14px",
  marginTop: "6px",
},

actionGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "12px",
  marginTop: "20px",
},
sectionTitle: {
  color: "#111827",
  fontWeight: "700",
  fontSize: "22px",
  marginBottom: "15px",
},

subTitle: {
  color: "#111827",
  fontWeight: "600",
  fontSize: "18px",
},
sectionTitle: {
  fontSize: "22px",
  fontWeight: "700",
  color: "#111827",
  marginBottom: "12px",
},
};