import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Rules from "./pages/Rules";
import FollowUps from "./pages/FollowUps";
import BusinessSetup from "./pages/BusinessSetup";
import CustomerDetails from "./pages/CustomerDetails";
import Landing from "./pages/Landing";
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