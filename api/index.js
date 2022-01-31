//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Genre } = require('./src/db.js');
const { API_KEY } = process.env;
const axios = require('axios');

// Syncing all the models at once:
// "force: false" NO reinicia el servidor, guarda en DB.
conn.sync({ force: true }).then(async () => {
  // Antes de levantar el servidor:
  // Pre-cargar los Géneros:
  const verifyGenre = await Genre.findAll();
  // Verifico en DB:
  if(verifyGenre.length < 1){
    // SI es menor a 1, NO tiene contenido...
    // Si no hay nada en DB, busco los géneros en la API:
    const requestAPI = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    // Formateo el pedido de API:
    const formatAPI = requestAPI.data.results?.map((g) => {
      return {
        id: g.id,
        name: g.name,
      }
    });
    // console.log("Soy formatAPI >>> ", formatAPI);
    
    // Por último, los guardo/creo en DB.
    // "bulkCrete" ---> recibe un array y crea una fila por cada uno que recibe.
    
    const upload = await Genre.bulkCreate(formatAPI);
    console.log("Genres, ready!");
  }

  server.listen(3001, () => {

    console.log('Server it`s ready and listening at port: 3001'); // eslint-disable-line no-console
  });
  
})
.catch((error) => {
  console.log(error);
});
