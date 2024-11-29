import axios from "axios";
const LOCALHOST ="https://localhost:7182/api";
export const API_BASE_URL = LOCALHOST

const config = axios.create({
  baseURL: API_BASE_URL,
});

export default config;