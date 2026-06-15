import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";


export default function Rules() {
 

  const [rules, setRules] = useState([]);

  const [name, setName] = useState("");
  const [daysAfter, setDaysAfter] = useState("");
  const [messageTemplate, setMessageTemplate] = useState("");
const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
const [previewMode, setPreviewMode] = useState(true);
  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("follow_up_rules")
      .select("*")
      .eq("user_id", user.id)
      .order("days_after", { ascending: true });

    if (error) {
      console.log(error);
      return;
    }

    setRules(data || []);
  };

  const addRule = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!name || !daysAfter || !messageTemplate) {
      alert("Please fill out all fields");
      return;
    }

    const { error } = await supabase
      .from("follow_up_rules")
      .insert({
        user_id: user.id,
        name,
        days_after: Number(daysAfter),
        message_template: messageTemplate,
        active: true,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setDaysAfter("");
    setMessageTemplate("");

    fetchRules();
  };

  const deleteRule = async (id) => {
    const confirmed = window.confirm(
      "Delete this campaign?"
    );

    if (!confirmed) return;

    await supabase
      .from("follow_up_rules")
      .delete()
      .eq("id", id);

    fetchRules();
  };

  const toggleRule = async (rule) => {
    await supabase
      .from("follow_up_rules")
      .update({
        active: !rule.active,
      })
      .eq("id", rule.id);

    fetchRules();
  };

  const updateLocalRule = (id, field, value) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === id
          ? { ...rule, [field]: value }
          : rule
      )
    );
  };

  const saveRule = async (rule) => {
    await supabase
      .from("follow_up_rules")
      .update({
        name: rule.name,
        days_after: Number(rule.days_after),
        message_template: rule.message_template,
      })
      .eq("id", rule.id);

    setEditingId(null);

    fetchRules();
  };
const getRecommendedCampaigns = () => {
  return [
    {
      name: "Request Feedback",
      days_after: 1,
      message_template:
        "Hi {name}, thank you for visiting us. We'd love your feedback.",
    },
    {
  name: "7 Day Check-In",
  days_after: 7,
  message_template:
    "Hi {name}, thank you for shopping with us. We hope you're enjoying your purchase. Let us know if we can help with anything."
},
{
  name: "14 Day Return Visit",
  days_after: 14,
  message_template:
    "Hi {name}, it's been a couple of weeks since your last visit. We'd love to welcome you back soon."
},
    {
      name: "Return Reminder",
      days_after: 30,
      message_template:
        "Hi {name}, it’s been a while. We’d love to see you again.",
    },
    {
      name: "We Miss You",
      days_after: 90,
      message_template:
        "Hi {name}, we haven't seen you in a while. Here's something special for you.",
    },
  ];
};
const useTemplate = async (c) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("follow_up_rules").insert({
    user_id: user.id,
    name: c.name,
    days_after: c.days_after,
    message_template: c.message_template,
    active: true,
  });

  if (error) {
    alert(error.message);
    return;
  }

  await fetchRules();
  alert("Campaign added successfully!");
};
  return (
  <div className="page">
<Helmet>
    <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
    <meta
      name="description"
      content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
    />
  </Helmet>
  
    <Navbar />

    {/* 🟢 HEADER */}
    <div
  style={{
    padding: "20px",
    borderRadius: "12px",
    background: "#24304b",
    color: "white",
    marginBottom: "18px",
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: "22px",
      fontWeight: "700",
    }}
  >
    Campaign Automation
  </h1>

  <p
    style={{
      margin: "8px 0 0",
      fontSize: "14px",
      color: "rgba(255,255,255,0.75)",
      lineHeight: "1.4",
    }}
  >
    Create automated messages that bring customers back after visits, purchases, or inactivity.
  </p>

  <div
    style={{
      marginTop: "12px",
      fontSize: "12px",
      color: "rgba(255,255,255,0.6)",
    }}
  >
    💡 Example: “Send a reminder 7 days after purchase to request feedback”
  </div>
</div>

    {/* 🟡 RECOMMENDED (LESS DOMINANT) */}
    <div className="card" style={{ background: "#f9fafb" }}>
      <h2>Recommended Campaigns</h2>
      <p style={{ fontSize: "13px", color: "#666" }}>
        Quick-start templates you can use instantly
      </p>

      {getRecommendedCampaigns().map((c, index) => (
        <div key={index} style={{ marginBottom: "12px" }}>
          <strong>{c.name}</strong>
          <p style={{ margin: "4px 0", fontSize: "13px" }}>
            {c.days_after} days after interaction
          </p>
          <p style={{ fontSize: "13px", color: "#555" }}>
            {c.message_template}
          </p>

          <button onClick={() => useTemplate(c)}>
  Use Template
</button>
        </div>
      ))}
    </div>

    {/* 🔵 MAIN SECTION */}
    <div className="card">
      <h2>Your Campaigns</h2>

      {rules.length === 0 && (
        <p style={{ color: "#777" }}>No campaigns created yet.</p>
      )}

      {rules.map((rule) => (
        <div key={rule.id} style={{ paddingBottom: "12px", marginBottom: "12px", borderBottom: "1px solid #eee" }}>
          
          {editingId === rule.id ? (
            <>
              <input
                value={rule.name}
                onChange={(e) =>
                  updateLocalRule(rule.id, "name", e.target.value)
                }
              />

              <input
                type="number"
                value={rule.days_after}
                onChange={(e) =>
                  updateLocalRule(rule.id, "days_after", e.target.value)
                }
              />

              <textarea
                rows="3"
                value={rule.message_template}
                onChange={(e) =>
                  updateLocalRule(rule.id, "message_template", e.target.value)
                }
              />

              <button onClick={() => saveRule(rule)}>Save</button>
            </>
          ) : (
            <>
              <strong>{rule.name}</strong>

              <p style={{ fontSize: "13px" }}>
                ⏱ {rule.days_after} day(s) after interaction
              </p>

              <p style={{ fontSize: "13px", color: "#555" }}>
                {rule.message_template}
              </p>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <label style={{ fontSize: "12px" }}>
                  Active
                  <input
                    type="checkbox"
                    checked={rule.active}
                    onChange={() => toggleRule(rule)}
                  />
                </label>

                <button onClick={() => setEditingId(rule.id)}>Edit</button>
                <button onClick={() => deleteRule(rule.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>

    {/* 🟣 CREATE (COLLAPSED) */}
    <button
      onClick={() => setShowForm(!showForm)}
      style={{
        marginTop: "20px",
        padding: "10px",
        background: "#10b981",
        color: "white",
        border: "none",
        borderRadius: "8px",
        width: "100%",
      }}
    >
      + Create Custom Campaign
    </button>

    {showForm && (
      <div className="card">
        <h2>Create Campaign</h2>

        <input
          placeholder="Campaign Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Days After Interaction"
          value={daysAfter}
          onChange={(e) => setDaysAfter(e.target.value)}
        />

        <textarea
          rows="4"
          placeholder="Message Template"
          value={messageTemplate}
          onChange={(e) => setMessageTemplate(e.target.value)}
        />

        <button onClick={addRule}>Add Campaign</button>
      </div>
    )}
  </div>
);
}