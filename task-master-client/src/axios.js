import axios from "axios";

const server = axios.create({
    baseURL: "https://task-master-api.onrender.com",
});

export default server;