// Genero un estado inicial:
const initalState = {
    videogames: [],
    allVideoGames: [],
    genres: [],
    platforms: [],
    details: [],
};

function rootReducer(state = initalState, action) {
    switch(action.type){

        case 'GET_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideoGames: action.payload,
            }

        case 'GET_PLATFORMS':
            return {
                ...state,
                platforms: action.payload,
            }
        
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload,
            }

        case 'GET_DETAILS':
            return {
                ...state,
                details: action.payload,
            }

        case 'GET_NAME_VGAMES':
            return {
                ...state,
                videogames: action.payload,
            }
     
        case 'POST_VGAME':
            return {
                ...state,
            }

        case 'ORDER_AZ':
            let orderedVGames = [...state.videogames]
            
            let order =  orderedVGames.sort((a, b) => {
                if(a.name.toUpperCase() < b.name.toUpperCase()) {
                    return action.payload === 'asc' ? -1 : 1;
                }
                if(a.name.toUpperCase() > b.name.toUpperCase()) {
                    return action.payload === 'desc' ? -1 : 1;
                }
                return 0;
            })
            return {
                ...state,
                videogames: order,
            };

        case 'ORDER_RATING':
            let toBeSortedRating = [...state.videogames];

            let sortRating = toBeSortedRating.sort((a, b) => {
                if(a.rating < b.rating) {
                    return action.payload === 'low' ? -1 : 1;
                }
                if(a.rating > b.rating) {
                    return action.payload === 'top' ? -1 : 1;
                }
                return 0;
            });
            return {
                ...state,
                videogames: sortRating,
            };


        case "FILTER_CREATED":
            const createdGame = action.payload === "created"    ? 
                            state.allVideoGames.filter(g => g.created_inDB)
                                : 
                            state.allVideoGames.filter(g => !g.created_inDB);
                            console.log("soy action.payload >>> ", action.payload);
            return{
                ...state,
                videogames: action.payload === "all" ? [...state.allVideoGames] : createdGame,
            };


        // HACER DOBLE FOR PARA i = genres && j = Genres ?
        case 'FILTER_BY_GENRES':
            const genresAPI = [...state.allVideoGames];

            const filteredGenresAPI = action.payload === 'all' ? 
                                        genresAPI
                                            :
                                        genresAPI.filter((gen) => gen.Genres?.includes(action.payload))
                                        // console.log("soy filteredGenresAPI", filteredGenresAPI);

            let filteredGenDB =       genresAPI?.filter((x) => {
              
                        // Revisamos el array.
                        for(let i = 0; i < x.genres?.length; i++) {
                        if(x.genres[i]?.name.includes(action.payload)){
                            return true;
                        }
                        }
                        // Si no lo encontramos en el array no hay nada
                        return false;  
                    });

        const concatGen = filteredGenresAPI.concat(filteredGenDB);
              console.log("soy action.payload >>> ", action.payload);
            
            return {
                ...state,
                videogames: concatGen,
            };


                    
        default: return state

    };
};

export default rootReducer;



            
    // ! CONFIRMAR QUE ANDE BIEN al usar mas de una vez y cuando estoy eligiendo los juegos en db
    // case "FILTER_BY_GENRE": 
    //     const gamesState = [...state.allVideoGames];
    //     const statusGenresAPI =  
    //                              gamesState?.map((el) =>{
    //                     return gamesState.created_inDB ?
    //                     gamesState.genres?.map( (el) =>  el.name) === action.payload
    //                     : 
    //                     el.Genres?.includes(action.payload) === action.payload
    //                 })
    //         console.log("soy action.payload >>> ", action.payload);
    //         console.log("soy result >>> ", statusGenresAPI);
    //         return {
    //             ...state,
    //             videogames: action.payload === 'all' ? gamesState : statusGenresAPI ,
    //         }





        // if (action.payload){
        //     return {
        //         ...state, 
        //         videogames: filteredGenresAPI.concat(genresAPI.filter((game) => {
        //                 return game.genres?.find((genre) => genre.name === action.payload)  //  esto trae de DB
        //             }))
                    
        //         }
        //     }


        // if (action.payload){
        //     return {
        //             ...state, 
        //             videogames: state.allVideoGames.filter((game) => {
        //                 return game.genres?.find((genre) => {return genre.name === action.payload})  //  esto trae de DB
        //             })
        //         }
        // }


        // } if (action.payload) {
        //     return {
        //             ...state, 
        //             videogames: state.allVideoGames.filter((game) => {return game.Genres?.find((genre) => {
        //                 return genre === action.payload})
        //             })}
         

                                // gamesState.filter((g) => g.Genres?.includes(action.payload) // ME LEE GENRES DE API [[ OK ]]
                                //     ? g.genres?.map((g) => (g.name)).join(' - ') : g )
                                //         :