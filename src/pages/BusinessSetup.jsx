import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import { Helmet } from "react-helmet-async";

<Helmet>
  <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
  <meta
    name="description"
    content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
  />
</Helmet>

export default function BusinessSetup() {
  const navigate = useNavigate();

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!businessName || !businessType) {
      alert("Please complete all fields");
      return;
    }

    const { error } = await supabase
      .from("business_profiles")
      .insert({
        user_id: user.id,
        business_name: businessName,
        business_type: businessType,
      });

    if (error) {
      alert(error.message);
      return;
    }

    await createStarterRules(user.id, businessType);

    navigate("/dashboard");
  };

  const createStarterRules = async (userId, type) => {
    let rules = [];

    switch (type) {
      case "Spa":
      case "Health & Wellness":
        rules = [
          {
            name: "Feedback Request",
            days_after: 1,
            message_template:
              "Hi {name}, thank you for visiting us. We'd love your feedback.",
          },
          {
            name: "Time To Rebook",
            days_after: 30,
            message_template:
              "Hi {name}, it may be time for your next appointment.",
          },
          {
            name: "We Miss You",
            days_after: 90,
            message_template:
              "Hi {name}, we haven't seen you in a while.",
          },
        ];
        break;

      case "Retail Store":
        rules = [
          {
            name: "Purchase Check-In",
            days_after: 7,
            message_template:
              "Hi {name}, how are you enjoying your purchase?",
          },
          {
            name: "New Arrivals",
            days_after: 30,
            message_template:
              "Hi {name}, we've added new items you may love.",
          },
          {
            name: "Special Offer",
            days_after: 60,
            message_template:
              "Hi {name}, here's a special offer just for you.",
          },
        ];
        break;

      default:
        rules = [
          {
            name: "Customer Follow-Up",
            days_after: 7,
            message_template:
              "Hi {name}, just checking in with you.",
          },
        ];
    }

    const records = rules.map((rule) => ({
      ...rule,
      user_id: userId,
      active: true,
    }));

    await supabase
      .from("follow_up_rules")
      .insert(records);
  };

  return (
    <div className="page">
      <Navbar />
      <div className="card">
        <h1>Welcome 👋</h1>

        <p>
          Let's set up your business.
        </p>

        <input
          placeholder="Business Name"
          value={businessName}
          onChange={(e) =>
            setBusinessName(e.target.value)
          }
        />

        <br />
        <br />

        <select
          value={businessType}
          onChange={(e) =>
            setBusinessType(e.target.value)
          }
        >
          <option value="">
            Select Business Type
          </option>

          <option>Spa</option>
          <option>Health & Wellness</option>
          <option>Barber</option>
          <option>Nail Technician</option>
          <option>Retail Store</option>
          <option>Restaurant</option>
          <option>Mechanic</option>
          <option>Other</option>
        </select>

        <br />
        <br />

        <button onClick={handleSave}>
          Continue
        </button>
      </div>
    </div>
  );
}