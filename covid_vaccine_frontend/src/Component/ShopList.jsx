
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStore } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import  {API_BASE_URL} from "../Config/Config";
const ShopList = () => {
    const [shops, setShops] = useState([]);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/Shops`);
                setShops(response.data);
            } catch (error) {
                console.error("Error fetching shops:", error);
                alert("Error fetching the shops.");
            }
        };

        fetchShops();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="max-w-5x2 mx-auto mt-8 flex-grow container mx-auto mt-12 p-6 bg-gray-50 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Covid Vaccine Card Information System
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="text-left px-6 py-3 text-gray-700 font-medium border border-gray-300">
                                    <div className="flex items-center">
                                        <FaStore className="mr-2 text-blue-600" /> Shop Name
                                    </div>
                                </th>
                                <th className="text-left px-6 py-3 text-gray-700 font-medium border border-gray-300">
                                    Location
                                </th>
                                <th className="text-center px-6 py-3 text-gray-700 font-medium border border-gray-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {shops.length > 0 ? (
                                shops.map((shop, index) => (
                                    <tr
                                        key={shop.shopid}
                                        className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                            } hover:bg-gray-100 transition duration-300`}
                                    >
                                        <td className="px-6 py-4 text-gray-800 border border-gray-300">
                                            {shop.shopName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 border border-gray-300">
                                            {shop.location}
                                        </td>
                                        <td className="px-6 py-4 border border-gray-300">
                                            <Link
                                                to={`/visitcrud`}
                                                className="inline-block px-4 py-2 text-sm mr-2 font-semibold text-white bg-gray-500 rounded-md hover:bg-blue-700 transition duration-200"
                                            >
                                                Create Customer Vaccine Card
                                            </Link>
                                            <Link 
                                                to={`/customers`}
                                                className="inline-block px-4 py-2 text-sm mr-2 font-semibold text-white bg-blue-400 rounded-md hover:bg-blue-700 transition duration-200"
                                            >
                                                View Customer Visit
                                            </Link>
                                            <Link
                                                to={`/vaccinecard`}
                                                className="inline-block px-4 py-2 text-sm mr-2 font-semibold text-white bg-red-300 rounded-md hover:bg-blue-700 transition duration-200"
                                            >
                                                View Vaccine Cards
                                            </Link>

                                            <Link
                                                to={`/shopdetial`}
                                                className="inline-block px-4 py-2 text-sm mr-2 font-semibold text-white bg-green-400 rounded-md hover:bg-blue-700 transition duration-200"
                                            >
                                                View Report
                                            </Link>

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-4 text-center text-gray-500 border border-gray-300"
                                    >
                                        No shops available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShopList;
