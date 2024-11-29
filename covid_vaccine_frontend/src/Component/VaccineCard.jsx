
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Home/Footer";
import Header from "../Home/Header";
import VaccineCardForm from "./VaccineCardForm";
import  {API_BASE_URL} from "../Config/Config";
const VaccineCard = () => {
    const [vaccineCards, setVaccineCards] = useState([]);

    const fetchVaccineCards = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/VaccineCards`);
            setVaccineCards(response.data);
        } catch (error) {
            console.error("Error fetching vaccine cards:", error);
        }
    };

    useEffect(() => {
        fetchVaccineCards();
    }, []);

    return (
        <div>
            <Header />
            <div className="container max-w-5x2 mx-auto mt-8">
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Vaccine Cards</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vaccineCards.map((card, index) => (
                            <div
                                key={index}
                                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex items-center space-x-4 mb-4 justify-center">
                                    <img
                                        src="data:image/png;base64,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"
                                        alt="Cambodian Logo"
                                        className="w-12 h-12 object-contain"
                                    />
                                    <div>
                                        <h1 className="text-xl font-semibold text-gray-800 text-center">ព្រះរាជាណាចក្រកម្ពុជា</h1>
                                        <h1 className="text-sm text-gray-600 text-center">Kingdom of Cambodia</h1>
                                    </div>
                                </div>

                                <hr className="mb-4" />

                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfnUs99Q0AlVZP_0JmXTOpa08J3IV7cYJI4Q&s"
                                        alt="Profile"
                                        className="w-20 h-20 object-contain rounded-full shadow-md"
                                    />
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-gray-900">គោត្តនាម​ នឹងនាម: {card.khmerName}</h3>
                                        <p className="text-sm font-bold text-gray-600">SURNAME & NAME: {card.englishName}</p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Card Type:</strong> {card.cardType}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Vaccine Manufacturer:</strong> {card.vaccineManufacturer}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Doses Received:</strong> {card.dosesReceived}
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            <strong>Fully Vaccinated:</strong> {card.isFullyVaccinated ? "Yes" : "No"}
                                        </p>
                                        {card.cardType === "MOD" && (
                                            <p className="text-sm text-gray-700">
                                                <strong>Military ID:</strong> {card.militaryId}
                                            </p>
                                        )}
                                        <p className="text-sm text-gray-700">
                                            <strong>Phone: (+855)</strong> {card.phoneNumber}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <VaccineCardForm/>
            <Footer />
        </div>
    );
};

export default VaccineCard;
