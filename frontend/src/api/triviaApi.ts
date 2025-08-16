import axios from "axios";

export const triviaApi = axios.create({
    // baseURL: "https://memorization-trivia.onrender.com"
    baseURL: "http://localhost:3001"
})