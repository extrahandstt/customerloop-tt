import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Rules from "./pages/Rules";
import FollowUps from "./pages/FollowUps";
import BusinessSetup from "./pages/BusinessSetup";
import CustomerDetails from "./pages/CustomerDetails";
import Landing from "./pages/Landing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import CrmTrinidad from "./pages/seo/CrmTrinidad";
import CustomerManagementTrinidad from "./pages/seo/CustomerManagementTrinidad";
import WhatsappAutomationTrinidad from "./pages/seo/WhatsappAutomationTrinidad";
import BusinessHubTrinidad from "./pages/seo/BusinessHubTrinidad";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
<Route path="/login" element={<Login />} />
<Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/followups" element={<FollowUps />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/refund" element={<RefundPolicy />} />
<Route path="/terms" element={<Terms />} />
<Route path="/business-growth-trinidad" element={<BusinessHubTrinidad />} />
<Route path="/crm-trinidad" element={<CrmTrinidad />} />
<Route
  path="/customer-management-software-trinidad"
  element={<CustomerManagementTrinidad />}
/>
<Route
  path="/whatsapp-business-automation-trinidad"
  element={<WhatsappAutomationTrinidad />}
/>
        
        <Route
  path="/customer/:id"
  element={<CustomerDetails />}
/>
        <Route
  path="/setup"
  element={<BusinessSetup />}
/>
      </Routes>
          </BrowserRouter>
  );
}

export default App;