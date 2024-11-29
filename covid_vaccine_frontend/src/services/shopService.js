import axios from 'axios';

const API_URL = 'https://localhost:7182/api/Shops'; // Replace with your API URL

const getShops = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('There was an error fetching the shops!', error);
        throw error;
    }
};

const createShop = async (shop) => {
    try {
        const response = await axios.post(API_URL, shop);
        return response.data;
    } catch (error) {
        console.error('There was an error creating the shop!', error);
        throw error;
    }
};

const updateShop = async (id, shop) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, shop);
        return response.data;
    } catch (error) {
        console.error('There was an error updating the shop!', error);
        throw error;
    }
};

const deleteShop = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('There was an error deleting the shop!', error);
        throw error;
    }
};

export default {
    getShops,
    createShop,
    updateShop,
    deleteShop
};
