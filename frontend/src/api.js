import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default {
    getHello() {
        return apiClient.get('/hello');
    },
    getGreet() {
        return apiClient.get('/greet');
    },
};
