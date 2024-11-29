
import React, { useState } from "react";
import axios from "axios";
import  {API_BASE_URL} from "../Config/Config";

const VaccineCardForm = () => {
  const [cardType, setCardType] = useState("MOH");
  const [vaccinationDate, setVaccinationDate] = useState("");
  const [vaccineManufacturer, setVaccineManufacturer] = useState("");
  const [isFullyVaccinated, setIsFullyVaccinated] = useState(true);
  const [dosesReceived, setDosesReceived] = useState(2);
  const [militaryId, setMilitaryId] = useState("");
  const [khmerName, setKhmerName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [passportNo, setPassportNo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

     const vaccineCard = {
    cardType,
    vaccinationDate,
    vaccineManufacturer,
    isFullyVaccinated,
    dosesReceived,
    militaryId: cardType === "MOD" ||"MOH" ? militaryId : undefined,
    khmerName,
    englishName,
    passportNo,
    phoneNumber,
  };

    try {
      const response = await axios.post(`${API_BASE_URL}/VaccineCards`, vaccineCard);
      console.log("Response data:", response.data); 
      alert("Vaccine Card added successfully!");
    } catch (error) {
      console.error("Error submitting vaccine card:", error.response || error.message);
      alert("Error submitting vaccine card.");
    }
  };

  return (
    <div className="max-w-5x2 mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">MOH AND MOD</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Card Type</label>
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="MOH">MOH</option>
            <option value="MOD">MOD</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Khmer's Name</label>
          <input
            type="text"
            value={khmerName}
            onChange={(e) => setKhmerName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">English's Name</label>
          <input
            type="text"
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

     
          <div>
            <label className="block text-sm font-medium text-gray-700">Military ID</label>
            <input
              type="text"
              value={militaryId}
              onChange={(e) => setMilitaryId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
       

        <div>
          <label className="block text-sm font-medium text-gray-700">Passport No or National ID</label>
          <input
            type="text"
            value={passportNo}
            onChange={(e) => setPassportNo(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vaccination Date</label>
          <input
            type="datetime-local"
            value={vaccinationDate}
            onChange={(e) => setVaccinationDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Vaccine Manufacturer</label>
          <input
            type="text"
            value={vaccineManufacturer}
            onChange={(e) => setVaccineManufacturer(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex items-center">
          <label className="text-sm font-medium text-gray-700 mr-2">Fully Vaccinated</label>
          <input
            type="checkbox"
            checked={isFullyVaccinated}
            onChange={(e) => setIsFullyVaccinated(e.target.checked)}
            className="rounded text-indigo-600 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Doses Received</label>
          <input
            type="number"
            value={dosesReceived}
            onChange={(e) => setDosesReceived(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Vaccine Card
        </button>
      </form>
    </div>
  );
};

export default VaccineCardForm;

