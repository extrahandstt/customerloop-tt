import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

export default function CustomerDetails() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
  loadData();
}, [id]);

  const loadData = async () => {
    const { data: customerData } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();

    if (!customerData) return;
setCustomer(customerData);
    const { data: interactionData } = await supabase
      .from("interactions")
      .select("*")
      .eq("customer_id", id)
      .order("created_at", {
        ascending: false,
      });

    setInteractions(interactionData || []);

    const { data: taskData } = await supabase
      .from("follow_up_tasks")
      .select(`
        *,
        follow_up_rules(*)
      `)
      .eq("customer_id", id)
      .order("due_date", {
        ascending: false,
      });

    setTasks(taskData || []);
  };

  if (!customer) {
    return <p>Loading...</p>;
  }

  return (
    
        <div className="page">
            <Navbar />
      <div className="card">
  <h1>{customer.name}</h1>
  <p>{customer.phone}</p>

  <hr />

  <h3>Customer Overview</h3>

  <p>
    Total Interactions: {interactions.length}
  </p>

  <p>
    Total Follow-ups: {tasks.length}
  </p>

  <p>
    Pending Tasks:{" "}
    {
      tasks.filter(
        (t) => t.status === "pending"
      ).length
    }
  </p>
  <button
  onClick={() => {
    if (!customer?.phone) return;

    const cleanPhone = customer.phone.replace(/\D/g, "");

    window.open(
      `https://wa.me/${cleanPhone}`
    );
  }}
>
  WhatsApp Customer
</button> 
</div>

      <div className="card">
        <h2>Follow Up History</h2>

        {tasks.map((task) => (
          <div key={task.id}>
            <p>
              {task.follow_up_rules?.name}
            </p>

            <p>
              Status: {task.status}
            </p>
<p>Total: {tasks.length}</p>
            <p>
              Due: {task.due_date}
            </p>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}