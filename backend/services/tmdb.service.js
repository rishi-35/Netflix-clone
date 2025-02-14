const axios =require('axios');
const env_var = require('../config/env_var');


async function fetchTMDB(url) {
    if (!env_var.TMDB_API_KEY) {
        throw new Error("TMDB API Key is missing");
    }

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${env_var.TMDB_API_KEY}`
        }
    };

    try {
        const response = await axios.get(url, options);

        if (response.status !== 200) {
            throw new Error("Unable to fetch data from TMDB");
        }

        return response.data;
    } catch (error) {
        // Better error handling
        console.error("Error fetching TMDB data:", error);
        throw error;
    }
}
module.exports=fetchTMDB;