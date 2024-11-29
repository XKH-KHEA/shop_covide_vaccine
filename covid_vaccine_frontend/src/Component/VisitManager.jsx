import axios from "axios";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import  {API_BASE_URL} from "../Config/Config";
const VisitManager = () => {
  const [visits, setVisits] = useState([]);
  const [vaccineCards, setVaccineCards] = useState([]);
  const [vaccineCardFilter, setVaccineCardFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {

        const visitResponse = await axios.get(`${API_BASE_URL}/Visits`);
        setVisits(visitResponse.data);

        const vaccineCardResponse = await axios.get(`${API_BASE_URL}/VaccineCards`);
        setVaccineCards(vaccineCardResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch data.");
      }
    };
    fetchData();
  }, []);


  const filteredVisits = visits.filter((visit) => {
    const matchesVaccineCardFilter = vaccineCardFilter
      ? visit.vaccineCardID === parseInt(vaccineCardFilter)
      : true;

    const matchesSearchQuery =
      !searchQuery ||
      visit.customer?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.customer?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.shop?.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.vaccineCard?.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visit.visitDate.split("T")[0].includes(searchQuery);

    return matchesVaccineCardFilter && matchesSearchQuery;
  });



  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const handleDelete = async (visitID) => {
    if (window.confirm("Are you sure you want to delete this visit?")) {
      try {
        await axios.delete(`${API_BASE_URL}/Visits/${visitID}`);
        alert("Visit deleted successfully!");
        setVisits(visits.filter((v) => v.visitID !== visitID));
      } catch (error) {
        console.error("Error deleting visit:", error);
        alert("Failed to delete visit.");
      }
    }
  };

  const handleExport = () => {
    const exportData = filteredVisits.map((visit) => ({
      Customer: `${visit.customer?.firstName} ${visit.customer?.lastName}`,
      Shop: visit.shop?.shopName,
      "Vaccine Card": `${visit.vaccineCard?.englishName} (${visit.vaccineCard?.CardType})`,
      Province: visit.province?.provinceName,
      "Visit Date": visit.visitDate.split("T")[0],
      "Visit Purpose": visit.visitPurpose,
      "Health Passed": visit.healthScreeningPassed ? "Yes" : "No",
    }));


    const ws = XLSX.utils.json_to_sheet(exportData);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CustomerReports");

    XLSX.writeFile(wb, "CustomerReports.csv");
  };

  return (
    <div className="max-w-5x2 mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Report Customers Created Card</h2>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search visits..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 rounded-md w-1/2 mr-4"
        />
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Exports
        </button>
      </div>


      <div className="mb-4 flex items-center">
        <label className="mr-2 text-gray-700">Filter by Vaccine Card:</label>
        <select
          value={vaccineCardFilter}
          onChange={(e) => setVaccineCardFilter(e.target.value)}
          className="border p-2 rounded-md mr-4"
        >
          <option value="">All</option>
          {vaccineCards.map((card) => (
            <option key={card.vaccineCardID} value={card.vaccineCardID}>
              {card.englishName} ({card.cardType})
            </option>
          ))}
        </select>
        <button
          onClick={() => setVaccineCardFilter("")}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Reset Filter
        </button>

      </div>

      <table className="w-full table-auto border-collapse border border-gray-200 mt-8">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Customer Name</th>
            <th className="px-4 py-2 border border-gray-300">Shop Name</th>
            <th className="px-4 py-2 border border-gray-300">Vaccine Card Name</th>
            <th className="px-4 py-2 border border-gray-300">Province Name</th>
            <th className="px-4 py-2 border border-gray-300">Visit Date</th>
            <th className="px-4 py-2 border border-gray-300">Purpose</th>
            <th className="px-4 py-2 border border-gray-300">Health Passed</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVisits.map((visit) => (
            <tr key={visit.visitID} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">
                {visit.customer?.firstName} {visit.customer?.lastName}
              </td>
              <td className="px-4 py-2 border border-gray-300">{visit.shop?.shopName}</td>
              <td className="px-4 py-2 border border-gray-300">
                {visit.vaccineCard?.englishName}   ({visit.vaccineCard?.cardType})
              
              </td>
              <td className="px-4 py-2 border border-gray-300">{visit.province?.provinceName}</td>
              <td className="px-4 py-2 border border-gray-300">{visit.visitDate.split("T")[0]}</td>
              <td className="px-4 py-2 border border-gray-300">{visit.visitPurpose}</td>
              <td className="px-4 py-2 border border-gray-300">
                {visit.healthScreeningPassed ? "Yes" : "No"}
              </td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  onClick={() => handleDelete(visit.visitID)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default VisitManager;
