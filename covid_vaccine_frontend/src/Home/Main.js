import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Covid Manager</h1>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-300">Home</Link>
            </li>
            <li>
              <Link to="/vaccinecard" className="hover:text-gray-300">VaccineCardForm</Link>
            </li>
            <li>
              <Link to="/customers" className="hover:text-gray-300">CustomerManager</Link>
            </li>
            <li>
              <Link to="/visit" className="hover:text-gray-300">VisitManager</Link>
            </li>
            <li>
              <Link to="/report" className="hover:text-gray-300">ReportDisplay</Link>
            </li>
          </ul>
        </div>
      </nav>


      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">COVID-19 Vaccination Card Samples issued by Cambodian </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          

          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700">Vaccine Card</h3>
            <p className="text-gray-600 mb-4">View, add, or edit Vaccine Card</p>
            <Link to="/vaccinecard" className="block text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2">
              Go to Projects
            </Link>
          </div>


          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700">Customer Manager</h3>
            <p className="text-gray-600 mb-4">Track and manage your project's tasks.</p>
            <Link to="/customers" className="block text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2">
              Go to Tasks
            </Link>
          </div>


          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700">Visit Manager</h3>
            <p className="text-gray-600 mb-4">Assign tasks and manage team members.</p>
            <Link to="/visit" className="block text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2">
              Go to Teams
            </Link>
          </div>

           <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700">Report Display</h3>
            <p className="text-gray-600 mb-4">Assign tasks and manage team members.</p>
            <Link to="/report" className="block text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg py-2">
              Go to Teams
            </Link>
          </div>

        </div>
      </div>

      <footer className="bg-blue-600 text-white p-4 mt-8">
        <div className="text-center">
          <p>&copy; 2024 Project Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Main;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Main from "./Home/Main";
// import VaccineCardForm from "./Component/VaccineCardForm";
// import CustomerManager from "./Component/Customers";
// import ReportDisplay from "./Component/ReportDisplay";
// import VisitManager from "./Component/VisitManager"; 

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/"  element={<Main />} />
//         <Route path="/vaccinecard" element={<VaccineCardForm />} />
//         <Route path="/customers" element={<CustomerManager />} />
//         <Route path="/visit" element={<VisitManager />} />
//         <Route path="/report" element={<ReportDisplay />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
