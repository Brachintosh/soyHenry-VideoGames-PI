// Genero un estado inicial:
const initalState = {
    videogames: [],
    allVideoGames: [],
    genres: [],
    allGenres: [],
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
                allGenres: action.payload,
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
                if(a.name < b.name) {
                    return action.payload === 'asc' ? -1 : 1;
                }
                if(a.name > b.name) {
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
                        console.log("Soy created >>> ", createdGame)
            return{
                ...state,
                videogames: action.payload === "all" ? state.allVideoGames : createdGame,
            };

            
            // ! CONFIRMAR QUE ANDE BIEN al usar mas de una vez y cuando estoy eligiendo los juegos en db
            case "FILTER_BY_GENRES": 

                const genresDB = [...state.allVideoGames];
                const gamesState = [...state.allVideoGames];
                
                const filterGenresDB = action.payload === 'all'  ?
                                gamesState
                                    :
                                genresDB.filter((gen) => gen.genres?.includes(action.payload));
                    console.log("soy filterGenresDB >>> ", filterGenresDB);

                const statusFiltered = action.payload === 'all' ? 
                                state.allVideoGames
                                    :
                                gamesState.filter((g) => g.Genres?.includes(action.payload));
                    console.log("soy statusFiltered >>> ", statusFiltered);

                    return {
                        ...state,
                        videogames:statusFiltered,
                    }

                    
        default: return state

    };
};

export default rootReducer;