import React from "react";
import './Pagination.css';  
// ! NO aparecen los botones de paginas...

export default function Pagination({ videogamesPerPage, allVideogames, pagination, value}) {
    const pageNumbers=[];

    for(let i = 1; i<=Math.floor(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <div>
            <div className="div-paginado">
                {pageNumbers && pageNumbers.map(number => (
                    <div className="btn-pag" key={number.toString()} >
                        <button
                            className={number === value ? 'actual' : 'boton-paginado'}
                            onClick={() => pagination(number)}
                            >
                            {number}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};