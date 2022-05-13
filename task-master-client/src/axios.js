import axios from "axios";

const server = axios.create({
    baseURL: "https://localhost:6299/",
});

export default server;