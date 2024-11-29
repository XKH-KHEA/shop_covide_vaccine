
import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver"; 
import  {API_BASE_URL} from "../Config/Config";
const ReportDisplay = () => {
  const [report, setReport] = useState([]);
  const [filteredReport, setFilteredReport] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Reports/vaccination`);
        setReport(response.data);
        setFilteredReport(response.data);
      } catch (error) {
        console.error("Error fetching report:", error);
        alert("Error fetching the vaccination report.");
      }
    };

    fetchReport();
  }, []);


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = report.filter((data) => {
      return (
        data.province.toLowerCase().includes(query) ||
        String(data.totalDoses).includes(query) ||
        String(data.totalVisitors).includes(query) ||
        data.cardTypeCount.some((card) =>
          card.cardType.toLowerCase().includes(query)
        )
      );
    });

    setFilteredReport(filtered);
  };

  const exportToCsv = () => {
    const headers = ["Province,Total of Doses,Visitor Count,Card Type"];
    const rows = filteredReport.map((data) => {
      const cardTypeDetails = data.cardTypeCount
        .map((card) => `${card.cardType}: ${card.count}`)
        .join(" | ");
      return `${data.province},${data.totalDoses},${data.totalVisitors},"${cardTypeDetails}"`;
    });

    const csvContent = [headers.join("\n"), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "vaccination_report.csv");
  };

  return (
    <div className="max-w-5x2 mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Vaccination Report</h2>

      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearch}
           className="border p-2 rounded-md w-1/2 mr-4"
        />
        <button
          onClick={exportToCsv}
         className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Exports
        </button>
      </div>

      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300">Province</th>
            <th className="px-4 py-2 border border-gray-300">Total of Doses</th>
            <th className="px-4 py-2 border border-gray-300">Visitor Count</th>
            <th className="px-4 py-2 border border-gray-300">Card Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredReport.map((data, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-2 border border-gray-300">{data.province}</td>
              <td className="px-4 py-2 border border-gray-300">{data.totalDoses}</td>
              <td className="px-4 py-2 border border-gray-300">{data.totalVisitors}</td>
              <td className="px-4 py-2 border border-gray-300">
                {data.cardTypeCount.map((card, idx) => (
                  <div key={idx} className="text-sm">
                    {card.cardType}: {card.count}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportDisplay;
