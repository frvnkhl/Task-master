import axios from "axios";

const server = axios.create({
    baseURL: "http://localhost:6299/",
});

export default server;