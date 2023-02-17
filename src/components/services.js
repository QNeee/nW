import axios from "axios";
const URL = 'https://nw.onrender.com/api/auth/login';
const URL_SEARCH_BY_NAME = 'https://api.themoviedb.org/3/search/movie';
const URL_SEARCH_BY_ID = 'https://api.themoviedb.org/3/movie';
export async function fetchByName(data) {
    try {
        const response = await axios.post(
            `${URL}`, data
        );
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}