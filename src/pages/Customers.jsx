import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tag, setTag] = useState("New Customer");
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
    <div style={{ padding: "30px" }}>

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
  <h2 style={{ marginBottom: "15px" }}>
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

  <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
  Last Interaction Date
</label>

<p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#666" }}>
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

<p style={{ fontSize: "12px", color: "#666" }}>
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
  <hr />

  {/* CUSTOMER LIST SECTION STARTS HERE */}
  <div style={{ marginTop: "20px" }}>
  <h2>
    Customers ({customers.length})
  </h2>
  <input
  placeholder="Search customers..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>
</div>
      {customers
  .filter((customer) =>
    customer.name
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((customer) => (
  <div key={customer.id} className="card">

    {/* Clickable name → Customer Details */}
    <h3
      style={{ cursor: "pointer", color: "blue" }}
      onClick={() =>
        navigate(`/customer/${customer.id}`)
        
      }
      
    >
      {customer.name}
    </h3>
{customer.tag && (
  <span
    style={{
      background: "#eef2ff",
      color: "#4338ca",
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "12px",
    }}
  >
    {customer.tag}
  </span>
)}
    <p>{customer.phone}</p>

    {/* VIEW HISTORY BUTTON */}
    <button
      onClick={() =>
        navigate(`/customer/${customer.id}`)
      }
    >
      View History
    </button>

    {/* ADD INTERACTION BUTTON (RESTORED) */}
    <button
      onClick={() => addInteraction(customer)}
    >
      + New Interaction
    </button>

    {/* OPTIONAL: WHATSAPP */}
    <button
      onClick={() => {
        const cleanPhone =
          customer.phone.replace(/\D/g, "");

        window.open(
          `https://wa.me/${cleanPhone}`
        );
      }}
    >
      WhatsApp
    </button>
<button
  onClick={() =>
    editCustomer(customer)
  }
>
  ✏️ Edit
</button>
<button
  onClick={() => deleteCustomer(customer.id)}
  style={{
    background: "#dc2626",
    color: "white",
    marginLeft: "10px",
  }}
>
  Delete
</button>
  </div>
))}

    </div>
  );
}