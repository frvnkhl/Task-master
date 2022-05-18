import server from "../axios";

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
    getAllTasks,
    createNewTask,
    editTask,
    deleteTask,
    logout
};

export default DataService;