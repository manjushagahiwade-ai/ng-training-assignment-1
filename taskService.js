import axios from 'axios';

const API_URL = 'http://localhost:9000/api';

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const getTask = id => axios.get(`${API_URL}/task/${id}`);
export const createTask = task => axios.post(`${API_URL}/task`, task);
export const updateTask = (id, task) => axios.put(`${API_URL}/task/${id}`, task);
export const deleteTask = id => axios.delete(`${API_URL}/task/${id}`);
