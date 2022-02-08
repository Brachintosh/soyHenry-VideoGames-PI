import React from "react";
// Importo a los Hooks de React:
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Importo >> Acciones a ser llamadas:
import { getVideoGames, getPlatforms, getGenres } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import FilterCreated from "../Filters/FilterCreated.jsx";
import FilterGenres from "../Filters/FilterGenres.jsx"
import LoaderHome from "../LoaderHome/LoaderHome.jsx";
import OrderAZ from "../Orders/OrderAZ.jsx";
import OrderRating from "../Orders/OrderRating.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import './Home.css';

// [ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden 
//  alfabético y por rating


export default function Home(){

    const dispatch = useDispatch();
    const allVgames = useSelector((state) => state.videogames);
    // Paginado:
    // const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
    const [vgamesPerPage, setVideogamesPerPage] = useState(15);

    const indexOfLastVgames= currentPage * vgamesPerPage    //15
    const indexOfFirstVgames = indexOfLastVgames - vgamesPerPage    //0
    const currentVgames = allVgames.slice(indexOfFirstVgames, indexOfLastVgames)
    console.log(currentVgames)
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    // Hooks:
    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
      }, [dispatch]);
    
      useEffect(() => {
        dispatch(getVideoGames());
      }, [dispatch]);

      
    function handleOnClick(e) {
        e.preventDefault();
        dispatch(getVideoGames());
    }
    
    if (!allVgames.length) {
        return <LoaderHome />;
    }
    return(
        <div className="home-container">
            <h1>Gamming.Life</h1>
            <Link to='/create_game'><h6>Create a game</h6></Link>
            {/* REALOAD BUTTON */}
            <button onClick={e => handleOnClick(e)} >REALOAD GAMES</button><br/><br />
            {/* SORT Y FILTER */}
            <div className="order-filters">
                <div className="sort-az">
                    <OrderAZ paginaLocal={setCurrentPage} />
                </div>
                <div className="order-rating">
                    <OrderRating paginaLocal={setCurrentPage} />
                </div>
                 <div className="filter-created">
                    <FilterCreated paginaLocal={setCurrentPage} />
                </div>
                <div className="filter-platforms/genres">
                    <FilterGenres paginaLocal={setCurrentPage} />
                </div>
            </div>
            {/* PAGINADO: */}
            <Paginado
                value={currentPage}
                vgamesPerPage = {vgamesPerPage}
                allVgames = {allVgames.length}
                paginado = {paginado}
            />
            {/* SEARCH-BAR: */}
            <SearchBar paginaLocal={setCurrentPage} /><br /><br />

            <div className="card-container">
            {
                currentVgames?.map((el) => {
                    return(
                        <div>
                            <Link to={'/videogame/' + el.id} style={{textDecoration:'none', color:'black'}} key={el.id} >
                                <Card
                                    key={el.id}
                                    id={el.id}
                                    name={el.name}
                                    background_image={el.background_image}
                                    rating={el.rating}
                                    released={el.released? el.released : el.releaseDate}
                                    genres={!currentVgames[0].created_inDB? el.Genres.join(' - ') : currentVgames[0].genres.map((g) => (g.name)).join(' - ')}
                                />
                            </Link>
                        </div>
                    )
                })   
            }
            </div>
        </div>
    );
};