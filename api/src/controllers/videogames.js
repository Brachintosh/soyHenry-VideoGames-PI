const axios = require('axios');
const { Videogame, Platform, Genre } = require('../db');
const { API_KEY } = process.env;

const getAPI_Info = async() => {

    try {
        // API:
        let gamesPageONE = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        let gamesPageTWO = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
        let gamesPageTHREE = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
        let gamesPageFOUR = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
        let gamesPageFIVE = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);
        let gamesPageSIX = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=6`);
        let gamesPageSEVEN = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=7`);
        let gamesPageEIGHT = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=8`);

        let promiseALL = await Promise.all([gamesPageONE, gamesPageTWO, gamesPageTHREE, gamesPageFOUR, gamesPageFIVE, gamesPageSIX, gamesPageSEVEN, gamesPageEIGHT]);

        gamesPageONE = promiseALL[0].data.results;
        gamesPageTWO = promiseALL[1].data.results;
        gamesPageTHREE = promiseALL[2].data.results;
        gamesPageFOUR = promiseALL[3].data.results;
        gamesPageFIVE = promiseALL[4].data.results;
        gamesPageSIX = promiseALL[5].data.results;
        gamesPageSEVEN = promiseALL[6].data.results;
        gamesPageEIGHT = promiseALL[7].data.results;

        let infoAPI = gamesPageONE.concat(gamesPageTWO).concat(gamesPageTHREE).concat(gamesPageFOUR).concat(gamesPageFIVE).concat(gamesPageSIX).concat(gamesPageSEVEN).concat(gamesPageEIGHT);
        infoAPI = infoAPI.map((el) => {
            return {
                id: el.id,
                name: el.name,
                released: el.released,
                background_image: el.background_image,
                rating: el.rating,
                platforms: el.platforms.map(p => p.platform.name),
                Genres: el.genres.map(g => g.name),
            }
        });
        // console.log("Soy infoAPI >>> ", infoAPI);
        return infoAPI;

    } catch (error) {
        console.log(error);
    }
};

const getDB_info = async() => {
    try {
        return await Videogame.findAll({
            include: {
                model: Genre, Platform,
                attributes: ['name'],
                through: {
                    attributes:[],
                },
            },
        });

    } catch (error) {
        console.log(error);
    }
};

const getAllVgames = async() => {
    try {
        const infoAPI = await getAPI_Info();
        const infoDB = await getDB_info();
        
        const infoTotal = infoAPI.concat(infoDB);

        // console.log("Soy infoTotal >>> ", infoTotal);
        return infoTotal;

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAPI_Info,
    getDB_info,   
    getAllVgames,
}