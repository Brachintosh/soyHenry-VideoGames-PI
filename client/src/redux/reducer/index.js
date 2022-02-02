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

        case 'FILTER_CREATED':
            const allGames = state.allVideoGames;
            const filterCreated = action.payload === 'created' ? 
                              state.allVideoGames.filter(fc => fc.created_inDB)
                                  : 
                              allGames.filter(fc => !fc.created_inDB);

            return {
                ...state,
                videogames: action.payload === 'All' ? state.allVideoGames : filterCreated,
            }
            //! NO COMPILA >>> REVISAR ! [ line 100 - 105 ]
        // case 'SORT_VGAMES':
        //     // Orden por rating:
        //     if(action.payload === 'rating') {
        //         let sortedRating = state.videogames.sort(function(a, b) {
        //             if(a.rating > b.rating) {
        //                 return -1;
        //             } else if(a.rating < b.rating) {
        //                 return 1;
        //             } else {
        //                 return 0;
        //             }
        //         });
        //         return {
        //             ...state,
        //             videogames: sortedRating,
        //         }

        //     } else { 
        //         // Orden por nombre:
        //         let sortedNames = action.payload === 'asc'
        //             ? 
        //         state.videogames.sort(function(a, b) {
        //             if(a.name > b.name) {
        //                 return 1;
        //             }
        //             if(a.name < b.name) {
        //                 return -1;
        //             }
        //             return 0
        //         })
        //               :

        //         state.videogames.sort(function(a, b) {
        //             if(a.name > b.name) {
        //                 return 1;
        //             }
        //             if(a.name < b.name) {
        //                 return -1
        //             }
        //             return 0;
        //         });
        //     }
        //     return {
        //         ...state,
        //         videogames: sortedNames,
        //     }

        default: return state

    };
};

export default rootReducer;