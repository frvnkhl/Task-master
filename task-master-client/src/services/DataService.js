import server from "../axios";
import authHeader from "./authHeader";

const registerUser = async (userData) => {
    return await server.post('/register', userData, { withCredentials: true });
};

const loginUser = async (userData) => {
    return await server.post('/login', userData, { withCredentials: true }).then(res => {
        console.log(res.data);
        try {
            localStorage.setItem('JWT', res.data.token);
        } catch (err) {
            console.error(err);
        }

        return res.data;
    });
};

const googleLogin = async () => {
    return await server.get('/auth/google', { withCredentials: true }).then(res => {
        console.log(res.data);
        if (res.data.username) {
            localStorage.setItem('user', JSON.stringify(res.data));
        }
        return res.data;
    });
};

const facebookLogin = async () => {
    return await server.get('/auth/facebook', { withCredentials: true }).then(res => {
        console.log(res.data);
        if (res.data.username) {
            localStorage.setItem('user', JSON.stringify(res.data));
        }
        return res.data;
    });
};

const getAllTasks = async (accessToken) => {
    return await server.get('/user/tasks', {
        withCredentials: true, headers: { Authorization: `JWT ${accessToken}` }
    });
};

const createNewTask = async (newTask, accessToken) => {
    return await server.post('/user/tasks/new', newTask, {
        withCredentials: true, headers: { Authorization: `JWT ${accessToken}` }
    });
};

const editTask = async (id, editedFields, accessToken) => {
    return await server.patch(`/user/tasks/${id}`, editedFields, { withCredentials: true, headers: { Authorization: `JWT ${accessToken}` } });
};

const deleteTask = async (id, accessToken) => {
    return await server.delete(`/user/tasks/${id}`, { withCredentials: true, headers: { Authorization: `JWT ${accessToken}` } });
};

const logout = async () => {
    localStorage.removeItem('JWT');
    return await server.get('/logout');
};

const DataService = {
    registerUser,
    loginUser,
    googleLogin,
    facebookLogin,
    getAllTasks,
    createNewTask,
    editTask,
    deleteTask,
    logout
};

export default DataService;