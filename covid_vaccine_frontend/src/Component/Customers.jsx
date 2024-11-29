import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import  {API_BASE_URL} from "../Config/Config";
const CustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/Customers`);
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        alert("Failed to fetch customers.");
      }
    };
    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
 
        await axios.put(`${API_BASE_URL}/Customers/${formData.customerID}`, formData);
        alert("Customer updated successfully!");
      } else {

        const { customerID, ...newCustomer } = formData; 
        await axios.post(`${API_BASE_URL}/Customers`, newCustomer);
        alert("Customer added successfully!");
      }


      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        address: "",
      });
      setEditing(false);

      const response = await axios.get(`${API_BASE_URL}/Customers`);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error submitting customer:", error);
      alert("Failed to submit customer.");
    }
  };

  const handleEdit = (customer) => {
    setFormData(customer);
    setEditing(true);
  };

  const handleDelete = async (customerID) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`${API_BASE_URL}/Customers/${customerID}`);
        alert("Customer deleted successfully!");

        setCustomers(customers.filter((c) => c.customerID !== customerID));
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer.");
      }
    }
  };

  return (
    <div>
    <Header/>
    <div className="max-w-5x2 mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Customer</h2>

      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border border-gray-300">First Name</th>
            <th className="px-4 py-2 border border-gray-300">Last Name</th>
            <th className="px-4 py-2 border border-gray-300">Phone Number</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">Address</th>
            <th className="px-4 py-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerID} className="hover:bg-gray-50">
              <td className="px-4 py-2 border border-gray-300">{customer.firstName}</td>
              <td className="px-4 py-2 border border-gray-300">{customer.lastName}</td>
              <td className="px-4 py-2 border border-gray-300">{customer.phoneNumber}</td>
              <td className="px-4 py-2 border border-gray-300">{customer.email}</td>
              <td className="px-4 py-2 border border-gray-300">{customer.address}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  onClick={() => handleEdit(customer)}
                  className="inline-block px-4 py-2 text-sm mr-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer.customerID)}
                  className="inline-block px-4 py-2 text-sm mr-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={handleSubmit} className="mb-8 p-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="First Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Last Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editing ? "Update Customer" : "Add Customer"}
        </button>
      </form>

    </div>
    <Footer/>
    </div>
  );
};

export default CustomerManager;
