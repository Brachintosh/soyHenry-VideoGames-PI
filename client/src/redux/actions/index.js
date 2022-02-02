import axios from 'axios';

export function getVideoGames(){

    return async function(dispatch){
        const infoBack = await axios.get("http://localhost:3001/videogames")

        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: infoBack.data,
        });
    }
};

export function getNameVgames(name){

    return async function(dispatch){
        try {
            var nameSearch = await axios.get("http://localhost:3001/videogames?name=" + name);

            console.log("Soy el resultado de la busqueda... >>> ", nameSearch.data)

            return dispatch({
                type: 'GET_NAME_VGAMES',
                payload: nameSearch.data,
            })

        } catch (error) {
            console.log(error)
        }
    }
};

export function getGenres(){
  
    return async function(dispatch){
        var infoGenres = await axios.get("http://localhost:3001/genres");
        
        return dispatch({
            type: 'GET_GENRES',
            payload: infoGenres.data,
        });
    }
};

export function getPlatforms(){

    return async function(dispatch){
        var infoPlatform = await axios.get("http://localhost:3001/platform");

        return dispatch({
            type: 'GET_PLATFORMS',
            payload: infoPlatform.data,
        });
    };

};

export function getDetails(id){

    if(id){
        return async function(dispatch){
            try {
                const infoID = await axios.get(`http://localhost:3001/videogame/${id}`);
                // console.log("Soy infoID >>> ", infoID);
                const response = await infoID.data;

                dispatch({
                    type: 'GET_DETAILS',
                    payload: response,
                }); 
            } catch (error) {
                console.log(error);
            }
        }
    };
};

export function postVgame(payload){
    
    return async function(dispatch){
        
        const infoGame = await axios.post('http://localhost:3001/videogames', payload);

        return infoGame;
    };
};

export function filterCreated (payload){
    return {
        type:'FILTER_CREATED',
        payload,
    };
};

export  function sortVideoGames(payload){
    
    return{
        type: 'SORT_VIDEOGAMES',
        payload,
    };
};