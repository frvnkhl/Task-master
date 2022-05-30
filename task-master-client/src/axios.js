import axios from "axios";

const server = axios.create({
    baseURL: "https://task-master-server.herokuapp.com/",
});

export default server;