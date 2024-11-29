import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';;
import ShopList from "./Component/ShopList";
import VaccineCard from "./Component/VaccineCard";
import CustomerManager from "./Component/Customers";
import VisitManager from "./Component/VisitManager";
import VaccineCardForm from "./Component/VaccineCardForm";
import ShopDetails from "./Component/ShopDetails";
import VisitCRUD from "./Config/ReportCustomerCreatCart";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShopList />} />
        <Route path="/vaccinecard" element={<VaccineCard />} />
        <Route path="/vaccinecardform" element={<VaccineCardForm />} />
        <Route path="/customers" element={<CustomerManager />} />
        <Route path="/visit" element={<VisitManager />} />
        <Route path="/visitcrud" element={<VisitCRUD/>}/>
        <Route path="/shopdetial" element={<ShopDetails />} />
      </Routes>
    </Router>
  );
}
export default App;