import React from "react";
// Importo a los Hooks de React:
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Importo >> Acciones a ser llamadas:
import { getVideoGames, getPlatforms, filterCreated, sortVideoGames } from "../../redux/actions/index";
import { Link } from "react-router-dom";
import Card from "../Card/Card.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx";
import './Home.css';

// [ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden 
//  alfabético y por rating
// [ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, 
//  mostrando los primeros 15 en la primer pagina.

export default function Home(){

    const dispatch = useDispatch();
    const allVgames = useSelector((state) => state.videogames);
    // Paginado:
    const [currentPage, setCurrentPage] = useState(1);
    const [vgamesPerPage] = useState(15);
    // eslint-disable-next-line
    const [orden, setOrden] = useState('');

    const indexOfLastVgames = currentPage * vgamesPerPage;
    const indexOfFirstVgames = indexOfLastVgames - vgamesPerPage;
    const currentVgames = allVgames.slice(indexOfFirstVgames, indexOfLastVgames)
    console.log(currentVgames);
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }
    // Hooks:
    useEffect(() => {
        dispatch(getVideoGames());  // Pide al back los juegos.
        dispatch(getPlatforms());   // Pide al back las plataformas.
    }, [dispatch]);

    function handleOnClick(e) {
        e.preventDefault();
        dispatch(getVideoGames());
    }

    function handleFilterCreated(e) {
        dispatch(filterCreated(e.target.value))
    }

    function handleSortGames(e) {
        dispatch(sortVideoGames(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }


    return(
        <div className="home-container">
            <h1>Gamming.Life</h1>
            <Link to='/create_game'><h6>Create a game</h6></Link>
            {/* REALOAD BUTTON */}
            <button onClick={e => handleOnClick(e)} >REALOAD GAMES</button><br/><br />

            {/* SORT Y FILTER */}
            <div>
                <select onChange={e => handleSortGames(e)}>
                    <option value="default">Sort by...</option>
                    <option value="asc">A - Z</option>
                    <option value="desc">Z - A</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
            <div>
                <select onChange={e => handleFilterCreated(e)}>
                    <option value="default">Order by...</option>
                    <option value="All">All Games</option>
                    <option value="api">API Games</option>
                    <option value="created">Created Games</option>
                </select>
            </div>

            {/* PAGINADO: */}
            <Pagination
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
                                    genres={!currentVgames[0].createdInDB? el.Genres : currentVgames[0].genres.map((g) => (g.name)).join(' - ')}
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