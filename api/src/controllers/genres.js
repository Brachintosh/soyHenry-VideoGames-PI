const { API_KEY } = process.env;
const  { Genre } = require('../db');
const axios = require('axios');

const getGenres = async(req, res) => {

    try {
        const vgAPI = await axios.get(
            `https://api.rawg.io/api/genres?key=${API_KEY}`
        );
        // console.log("Soy vgAPI >>> ", vgAPI.data.results);

        const vg_genres = vgAPI.data.results;
        // console.log("Soy Genres >>> ", vg_genres);

        vg_genres.forEach(async (g) => {
            await Genre.findOrCreate({
                where: {
                    name: g.name,
                },
            });
        });

        const allGenres = await Genre.findAll();

        // console.log("Soy AllGenres >>> ", allGenres);
        res.status(200).json(allGenres);
        
    } catch (err) {
        return console.log(err);
    }

};

module.exports = {
    getGenres,
};