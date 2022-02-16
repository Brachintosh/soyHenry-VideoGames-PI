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

export default function Home(){

    const dispatch = useDispatch();
    const allVgames = useSelector((state) => state.videogames);
    // Paginado:
    // const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line
    const [vgamesPerPage, setVideogamesPerPage] = useState(15);

    const indexOfLastVgames= currentPage * vgamesPerPage    // [14]
    const indexOfFirstVgames = indexOfLastVgames - vgamesPerPage    // [0]
    const currentVgames = allVgames.slice(indexOfFirstVgames, indexOfLastVgames)
    // console.log("Soy currentGamesInPage >>> ", currentVgames)
    const paginado = (pageNumber) =>{
        setCurrentPage(pageNumber)
    }
    // Hooks:
    useEffect(() => {
        // dispatch(getVideoGames());
        dispatch(getGenres());
        dispatch(getPlatforms());
      }, [dispatch]);

    if (allVgames?.length <= 0) {
                dispatch(getVideoGames());
        return <LoaderHome  className='loader-home' />;
    }
    return(
    <div className="home-container">
        <div className="home-c">

                <div className='search-bar'>
                    {/* SEARCH-BAR: */}
                    <SearchBar paginaLocal={setCurrentPage} /><br /><br />
                </div>

            {/* SORT Y FILTER */}
            <div className='order-filter-cont'>
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
            </div>

            {/* PAGINADO: */}
            <div className="paginado">
                <Paginado
                    value={currentPage}
                    vgamesPerPage = {vgamesPerPage}
                    allVgames = {allVgames.length}
                    paginado = {paginado}
                />
            </div>
            {/* CARDS: */}
            <div className="card-container">
            {
                currentVgames?.map((el) => {
                    return(
                        <div className="card-info" key={el.id}>
                            <Link to={'/videogame/' + el.id} style={{textDecoration:'none', color:'black', borderRadius:0}} key={el.id} >
                                <Card 
                                    key={el.id}
                                    id={el.id}
                                    name={el.name}
                                    background_image={el.background_image}
                                    rating={el.rating}
                                    released={el.released? el.released : el.releaseDate}
                                    genres={el.genres?.map((g) => (g.name)).join(' - ') ||  el.Genres?.join(' - ')}
                                />
                            </Link>
                        </div>
                    )
                })   
            }
            </div>
        </div>

    </div>
    );
};