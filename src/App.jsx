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
import HowToGetMoreCustomersTrinidad from "./pages/seo/HowToGetMoreCustomersTrinidad";
import HowToFollowUpWhatsAppTrinidad from "./pages/seo/HowToFollowUpWhatsAppTrinidad";
import WhyBusinessesLoseCustomersTrinidad from "./pages/seo/WhyBusinessesLoseCustomersTrinidad";
import Pricing from "./pages/Pricing";
import Onboarding from "./pages/Onboarding";

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
<Route path="/how-to-get-more-customers-trinidad" element={<HowToGetMoreCustomersTrinidad />} />

<Route path="/how-to-follow-up-customers-whatsapp-trinidad" element={<HowToFollowUpWhatsAppTrinidad />} />

<Route path="/why-businesses-lose-customers-trinidad" element={<WhyBusinessesLoseCustomersTrinidad />} />
<Route path="/pricing" element={<Pricing />} />

<Route path="/onboarding" element={<Onboarding />} />
<Route path="/" element={<Landing />} />
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