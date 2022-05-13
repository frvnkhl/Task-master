import server from "../axios";

const registerUser = async (userData) => {
    return await server.post('/register', userData);
};

const loginUser = async (userData) => {
    return await server.post('/login', userData);
};

const googleLogin = async () => {
    return await server.get('/auth/google');
};

const facebookLogin = async () => {
    return await server.get('/auth/facebook');
};

const getAllTasks = async () => {
    return await server.get('/tasks');
};

const createNewTask = async (newTask) => {
    return await server.post('/tasks/new', newTask);
};

const editTask = async (id, editedFields) => {
    return await server.patch(`/tasks/${id}`, editedFields);
};

const deleteTask = async (id) => {
    return await server.delete(`/tasks/${id}`);
};

const logout = async () => {
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