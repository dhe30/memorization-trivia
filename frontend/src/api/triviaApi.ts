import axios from "axios";

export const triviaApi = axios.create({
    baseURL: "http://localhost:3001/"
})