import { useState } from "react";

export default function Onboarding() {
  
  const [step, setStep] = useState(1);

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <Helmet>
    <title>CRM Software Trinidad & Tobago | CustomerLoop TT</title>
    <meta
      name="description"
      content="CRM software for small businesses in Trinidad & Tobago. Track customers, automate follow-ups, and increase repeat sales."
    />
  </Helmet>
  
      <h1>Welcome to CustomerLoop TT</h1>

      {step === 1 && (
        <div>
          <h2>Step 1: Add Your First Customer</h2>
          <p>This helps you start tracking your business properly.</p>

          <button onClick={() => setStep(2)}>
            I Added My First Customer →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Set Follow-Up Reminder</h2>
          <p>We recommend 3–7 days after first visit.</p>

          <button onClick={() => setStep(3)}>
            Continue →
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: You're Ready</h2>
          <p>Now your system will remind you who to follow up with.</p>

          <button>
            Go to Dashboard
          </button>
        </div>
      )}

    </div>
  );
}