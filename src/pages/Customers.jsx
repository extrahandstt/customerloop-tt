import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import Papa from "papaparse";
import { ui } from "../styles/ui";



export default function Customers() {
  <Helmet>
  <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
  <meta
    name="description"
    content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
  />
</Helmet>
    const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tag, setTag] = useState("New Customer");
  const [bulkText, setBulkText] = useState("");
  const [bulkTag, setBulkTag] = useState("New Customer");
const [bulkDate, setBulkDate] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [lastInteractionDate, setLastInteractionDate] =
  useState(new Date().toISOString().split("T")[0]);
  const [editingCustomerId, setEditingCustomerId] =
  useState(null);
    const [nextFollowUpDate, setNextFollowUpDate] =
  useState("");
    const [interactionCounts, setInteractionCounts] = useState({});
const filteredCustomers =
  customers.filter((customer) =>
    customer.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  const getSuggestedDate = (tag) => {
  const days = getSuggestedDays(tag);
  const date = new Date();

  date.setDate(date.getDate() + days);

  return date.toISOString().split("T")[0];
};
  useEffect(() => {
    fetchCustomers();
  }, []);
useEffect(() => {
  setNextFollowUpDate(getSuggestedDate(tag));
}, [tag]);
  useEffect(() => {
  if (tag === "New Customer" && !lastInteractionDate) {
    setLastInteractionDate(
      new Date().toISOString().split("T")[0]
    );
  }
}, []);

  const fetchCustomers = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
      .from("customers")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setCustomers(data || []);
  };
const editCustomer = (customer) => {
  setEditingCustomerId(customer.id);

  setName(customer.name);
  setPhone(customer.phone);
  setTag(customer.tag || "New Customer");

  setLastInteractionDate(
    customer.last_interaction_date || ""
  );
};
  const addCustomer = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
console.log("ADDING CUSTOMER START");
  const { data: customer, error } = await supabase
    .from("customers")
    .insert({
      user_id: user.id,
      name,
      phone,
      tag,
      last_interaction_date: lastInteractionDate,
    })
    .select()
    .single();

  if (error) {
    alert(error.message);
    return;
  }
console.log("CUSTOMER CREATED:", customer);
  const { data: rules } = await supabase
    .from("follow_up_rules")
    .select("*")
    .eq("user_id", user.id)
    .eq("active", true);

  if (rules?.length) {
    const tasks = rules.map((rule) => {
      const dueDate = new Date(lastInteractionDate);

      dueDate.setDate(
        dueDate.getDate() + rule.days_after
      );

      return {
        user_id: user.id,
        customer_id: customer.id,
        rule_id: rule.id,
        due_date: dueDate.toISOString().split("T")[0],
        status: "pending",
      };
    });

    await supabase
      .from("follow_up_tasks")
      .insert(tasks);
  }

  setName("");
  setPhone("");
  setTag("");
  setLastInteractionDate("");

  fetchCustomers();

  alert("Customer added successfully!");
  console.log("RULES LOADED:", rules);
};
const importBulkCustomers = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rules } = await supabase
    .from("follow_up_rules")
    .select("*")
    .eq("user_id", user.id)
    .eq("active", true);

  const lines = bulkText
    .split("\n")
    .filter((line) => line.trim());

  for (const line of lines) {
    const [name, phone] = line.split(",");

    const { data: customer, error } =
      await supabase
        .from("customers")
        .insert({
          user_id: user.id,
          name: name?.trim(),
          phone: phone?.trim() || "",
          tag: bulkTag,
          last_interaction_date: bulkDate,
        })
        .select()
        .single();

    if (error) continue;

    if (rules?.length) {
      const tasks = rules.map((rule) => {
        const dueDate = new Date(bulkDate);

        dueDate.setDate(
          dueDate.getDate() +
            rule.days_after
        );

        return {
          user_id: user.id,
          customer_id: customer.id,
          rule_id: rule.id,
          due_date: dueDate
            .toISOString()
            .split("T")[0],
          status: "pending",
        };
      });

      await supabase
        .from("follow_up_tasks")
        .insert(tasks);
    }
  }

  setBulkText("");
  fetchCustomers();

  alert(
    `${lines.length} customers imported`
  );
};
const handleCSVUpload = async (file) => {
const {
  data: { user },
} = await supabase.auth.getUser();
  Papa.parse(file, {
    header: true,

    complete: async (results) => {
      try {
        const customers = results.data
          .filter((row) => row.name)
          .map((row) => ({
            name: row.name,
            phone: row.phone || "",
            email: row.email || "",
            user_id: user.id,
          }));

        const { error } = await supabase
          .from("customers")
          .insert(customers);

        if (error) throw error;

        alert(`${customers.length} customers imported`);

        fetchCustomers();

      } catch (err) {
        alert(err.message);
      }
    },
  });
};
const addInteraction = async (customer) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Save interaction
  const { error } = await supabase
    .from("interactions")
    .insert({
      user_id: user.id,
      customer_id: customer.id,
      interaction_type: "visit",
      notes: "Manual interaction",
    });

  if (error) {
    console.log(error);
    alert("Failed to add interaction");
    return;
  }
await supabase
  .from("follow_up_tasks")
  .update({ status: "cancelled" })
  .eq("user_id", user.id)
  .eq("customer_id", customer.id)
  .eq("status", "pending");
  // 2. AUTO GENERATE TASKS
  await generateTasksFromRules(customer);

  alert("Interaction added + follow-ups created");

  fetchCustomers();
};
const generateTasksFromRules = async (customer) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: rules } = await supabase
    .from("follow_up_rules")
    .select("*")
    .eq("user_id", user.id)
    .eq("active", true);

  const today = new Date();

  for (const rule of rules) {
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + rule.days_after);

    // 🔥 CHECK IF TASK ALREADY EXISTS
    const { data: existing } = await supabase
      .from("follow_up_tasks")
      .select("id")
      .eq("user_id", user.id)
      .eq("customer_id", customer.id)
      .eq("rule_id", rule.id)
      .eq("status", "pending")
      .maybeSingle();

    if (existing) continue;

    await supabase.from("follow_up_tasks").insert({
      user_id: user.id,
      customer_id: customer.id,
      rule_id: rule.id,
      due_date: dueDate.toISOString().split("T")[0],
      status: "pending",
    });
  }
};
const getSuggestedDays = (tag) => {
  switch (tag) {
    case "New Customer":
      return 3;
    case "Repeat Customer":
      return 7;
    case "VIP":
      return 14;
    case "Retail":
      return 5;
    case "Appointment":
      return 1;
    default:
      return 3;
  }
};
const deleteCustomer = async (id) => {
  const confirmed = window.confirm(
    "Delete this customer?"
  );

  if (!confirmed) return;

  await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  fetchCustomers();
};
const saveCustomer = async () => {
  const { error } = await supabase
    .from("customers")
    .update({
      name,
      phone,
      tag,
      last_interaction_date:
        lastInteractionDate,
    })
    .eq("id", editingCustomerId);

  if (error) {
    alert(error.message);
    return;
  }

  setEditingCustomerId(null);

  setName("");
  setPhone("");
  setTag("New Customer");

  setLastInteractionDate(
    new Date().toISOString().split("T")[0]
  );

  fetchCustomers();

  alert("Customer updated!");
};
  return (
      <div style={ui.page}>

  <div
  style={{
    marginBottom: "20px",
    padding: "15px 20px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #0f172a, #3f4c67)",
    color: "white",
  }}
>
  <Navbar />
  <h1 style={{ margin: 0, fontSize: "28px" }}>
    👥 Customers
  </h1>

  <p style={{ margin: "5px 0 0", color: "#cbd5e1" }}>
    Manage your customers, track interactions, and improve repeat business.
  </p>
</div>

  {/* ADD CUSTOMER CARD WRAPPER */}
  <div className="card" style={{ marginBottom: "20px" }}>
  <h2 style={ui.sectionTitle}>
  Add New Customer
</h2>

  <input
    placeholder="Customer Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <br /><br />

  <input
    placeholder="Phone Number"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />

  <br /><br />

  {/* TAG DROPDOWN */}
  <select
    value={tag}
   onChange={(e) => {
  const newTag = e.target.value;
  setTag(newTag);

  setNextFollowUpDate(
  getSuggestedDate(
    newTag,
    lastInteractionDate
  )
);
}}
  >
    <option value="New Customer">🆕 New Customer</option>
    <option value="Repeat Customer">🔁 Repeat Customer</option>
    <option value="VIP">⭐ VIP</option>
    <option value="Retail">🏪 Retail</option>
    <option value="Appointment">📅 Appointment</option>
  </select>

  <label style={{ display: "block", marginBottom: "5px", fontWeight: "700" }}>
  Last Interaction Date
</label>

<p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#111827" }}>
  Select the last time you spoke with or served this customer.
</p>

<input
  type="date"
  value={lastInteractionDate}
  onChange={(e) => {
  const newDate = e.target.value;

  setLastInteractionDate(newDate);

  setNextFollowUpDate(
    getSuggestedDate(
      tag,
      newDate
    )
  );
  }}
  style={{
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  }}
/>
<label style={{ marginTop: "10px", display: "block" }}>
  Suggested Follow-Up Date
</label>

<input
  type="date"
  value={nextFollowUpDate}
  onChange={(e) => setNextFollowUpDate(e.target.value)}
/>

<p style={{ fontSize: "12px", color: "#111827" }}>
  Automatically suggested based on customer type.
</p>
  <br /><br />

  {/* GOLD BUTTON */}
  <button
  onClick={
    editingCustomerId
      ? saveCustomer
      : addCustomer
  }
>
  {editingCustomerId
    ? "💾 Save Changes"
    : "+ Add Customer"}
</button>
</div>
 <div style={{
  marginTop: "30px",
  padding: "16px",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  background: "#f9fafb"
}}>

  <h2 style={ui.sectionTitle}>
  📥 Bulk Import Customers
</h2>

  <p style={{ marginBottom: "20px", color: "#1f2937" }}>
    Quickly add multiple customers using paste or CSV upload.
  </p>

  {/* TWO COLUMN LAYOUT */}
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
    gap: "20px"
  }}>

    {/* LEFT SIDE - PASTE */}
    <div style={{
      padding: "15px",
      background: "#fff",
      borderRadius: "10px",
      border: "1px solid #eee"
    }}>

      <h3 style={ui.subTitle}>
  ✍️ Paste Customers
</h3>

      <label style={{ fontSize: "12px", color: "#111827" }}>
        Format: Name, Phone
      </label>

      <pre style={{
        background: "#f3f4f6",
        padding: "10px",
        borderRadius: "6px",
        fontSize: "12px",
        marginTop: "10px"
      }}>
John Smith,
8681234567
      </pre>

      <label style={{ display: "block", marginTop: "10px" }}>
        Customer Type
      </label>

      <select
        value={bulkTag}
        onChange={(e) => setBulkTag(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "5px"
        }}
      >
        <option value="New Customer">🆕 New Customer</option>
        <option value="Repeat Customer">🔁 Repeat Customer</option>
        <option value="VIP">⭐ VIP</option>
        <option value="Retail">🏪 Retail</option>
        <option value="Appointment">📅 Appointment</option>
      </select>

      <label style={{ display: "block", marginTop: "10px" }}>
        Last Interaction Date
      </label>

      <input
        type="date"
        value={bulkDate}
        onChange={(e) => setBulkDate(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "5px"
        }}
      />

      <textarea
        rows={8}
        value={bulkText}
        onChange={(e) => setBulkText(e.target.value)}
        placeholder={`John Smith,8681234567
Jane Doe,8687654321`}
        style={ui.input}
      />

      <button
        onClick={importBulkCustomers}
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          background: "#111827",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Import Customers
      </button>

    </div>

    {/* RIGHT SIDE - CSV */}
    <div style={{
      padding: "15px",
      background: "#fff",
      borderRadius: "10px",
      border: "1px solid #eee"
    }}>

      <h3
  style={{
    color: "#111827",
    fontWeight: "700",
    marginBottom: "12px",
  }}
>
  📁 Upload CSV File
</h3>

      <p style={{ fontSize: "12px", color: "#111827" }}>
        Upload a spreadsheet with columns:
        name and phone 
      </p>

      <pre style={{
        background: "#f3f4f6",
        padding: "10px",
        borderRadius: "6px",
        fontSize: "12px"
      }}>
John Smith,
8681234567
      </pre>

      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          if (e.target.files[0]) {
            handleCSVUpload(e.target.files[0]);
          }
        }}
        style={{
          marginTop: "10px",
          width: "100%"
        }}
      />

      <div style={{
        marginTop: "15px",
        fontSize: "12px",
        color: "#111827",
        lineHeight: "1.5"
      }}>
        ✔ Faster onboarding for new clients<br/>
        ✔ Works with Excel & Google Sheets<br/>
        ✔ Perfect for salons, shops, freelancers
      </div>

    </div>

  </div>

</div>
  {/* CUSTOMER LIST SECTION STARTS HERE */}
  <div style={{ marginTop: "20px" }}>

  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px"
  }}>
    
    <h2
  style={{
    margin: 0,
    color: "#111827",
    fontWeight: "700",
    fontSize: "24px",
  }}
>
  Customers ({customers.length})
</h2>

    <input
      placeholder="Search customers..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: "10px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        minWidth: "220px"
      }}
    />
  </div>
</div>
      {customers
  .filter((customer) =>
    customer.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((customer) => (
    <div key={customer.id} style={ui.card}>

      {/* NAME + TAG ROW */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        
        <h3
          onClick={() => navigate(`/customer/${customer.id}`)}
          style={{
            margin: 0,
            cursor: "pointer",
            fontSize: "16px",
            color: "#1d4ed8"
          }}
        >
          {customer.name}
        </h3>

        {customer.tag && (
          <span style={{
            background: "#eef2ff",
            color: "#4338ca",
            padding: "3px 8px",
            borderRadius: "999px",
            fontSize: "11px",
            whiteSpace: "nowrap"
          }}>
            {customer.tag}
          </span>
        )}
      </div>

      {/* PHONE */}
      <p style={{
        margin: 0,
        fontSize: "13px",
        color: "#555"
      }}>
        📞 {customer.phone}
      </p>

      {/* ACTION BUTTONS (COMPACT GRID) */}
<div style={ui.buttonGrid}>

        <button onClick={() =>
          navigate(`/customer/${customer.id}`)
        }>
          View
        </button>

        <button onClick={() =>
          addInteraction(customer)
        }>
          + Interaction
        </button>

        <button onClick={() => {
          const cleanPhone = customer.phone.replace(/\D/g, "");
          window.open(`https://wa.me/${cleanPhone}`);
        }}>
          WhatsApp
        </button>

        <button onClick={() =>
          editCustomer(customer)
        }>
          Edit
        </button>

        <button
          onClick={() => deleteCustomer(customer.id)}
          style={{ ...ui.primaryButton, ...ui.dangerButton }}
        >
          Delete
        </button>

      </div>

    </div>
  ))}
</div>
  );
}