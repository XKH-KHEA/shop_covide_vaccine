import React, { useState } from "react";
import axios from "axios";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import  {API_BASE_URL} from "./Config";
const VisitForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    shopName: "",
    location: "",
    cardType: "",
    vaccinationDate: "",
    vaccineManufacturer: "",
    isFullyVaccinated: true,
    dosesReceived: 0,
    militaryId: "",
    khmerName: "",
    englishName: "",
    passportNo: "",
    vaccinePhoneNumber: "",
    provinceName: "",
    visitDate: "",
    visitPurpose: "",
    healthScreeningPassed: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        address: formData.address,
      },
      shop: {
        shopName: formData.shopName,
        location: formData.location,
      },
      vaccineCard: {
        cardType: formData.cardType,
        vaccinationDate: formData.vaccinationDate,
        vaccineManufacturer: formData.vaccineManufacturer,
        isFullyVaccinated: formData.isFullyVaccinated,
        dosesReceived: parseInt(formData.dosesReceived, 10),
        militaryId: formData.militaryId,
        khmerName: formData.khmerName,
        englishName: formData.englishName,
        passportNo: formData.passportNo,
        phoneNumber: formData.phoneNumber,
      },
      province: {
        provinceName: formData.provinceName,
      },
      visitDate: formData.visitDate,
      visitPurpose: formData.visitPurpose,
      healthScreeningPassed: formData.healthScreeningPassed,
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/Visits`, payload);
      alert("Visit successfully created!");
      console.log(response.data);
    } catch (error) {
      console.error("Error creating visit:", error);
      alert("Failed to create visit. Check console for details.");
    }
  };

  return (
    <div>

      <Header />
      <div className="max-w-5x2 mx-auto mt-8 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center">Create Customer Vaccine</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg space-y-6 max-w-4xl mx-auto">

          {/* Customer Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
            </div>
          </div>

          {/* Shop Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shop Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Shop Name</label>
                <input
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Vaccine Card Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Vaccine Card Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Type</label>
                <select
                  name="cardType" 
                  value={formData.cardType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                >
                  <option value="MOH">MOH</option>
                  <option value="MOD">MOD</option>
                </select>

              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vaccination Date</label>
                <input
                  type="datetime-local"
                  name="vaccinationDate"
                  value={formData.vaccinationDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Vaccine Manufacturer</label>
                <input
                  type="text"
                  name="vaccineManufacturer"
                  value={formData.vaccineManufacturer}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Is Fully Vaccinated</label>
                <input
                  type="checkbox"
                  name="isFullyVaccinated"
                  checked={formData.isFullyVaccinated}
                  onChange={handleChange}
                  className="mt-1 block"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doses Received</label>
                <input
                  type="number"
                  name="dosesReceived"
                  value={formData.dosesReceived}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Military ID (Optional)</label>
                <input
                  type="text"
                  name="militaryId"
                  value={formData.militaryId}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Khmer Name</label>
                <input
                  type="text"
                  name="khmerName"
                  value={formData.khmerName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">English Name</label>
                <input
                  type="text"
                  name="englishName"
                  value={formData.englishName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Passport No (Optional)</label>
                <input
                  type="text"
                  name="passportNo"
                  value={formData.passportNo}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
            </div>
          </div>

          {/* Province Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Province Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Province Name</label>
                <input
                  type="text"
                  name="provinceName"
                  value={formData.provinceName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Visit Date</label>
                <input
                  type="datetime-local"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Visit Purpose</label>
                <input
                  type="text"
                  name="visitPurpose"
                  value={formData.visitPurpose}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Health Screening Passed</label>
                <input
                  type="checkbox"
                  name="healthScreeningPassed"
                  checked={formData.healthScreeningPassed}
                  onChange={handleChange}
                  className="mt-1 block"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>

      </div>
      <Footer />
    </div>
  );
};

export default VisitForm;


