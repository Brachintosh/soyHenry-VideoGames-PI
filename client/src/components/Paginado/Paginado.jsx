import React from "react";
import "./Paginado.css"

export default function Paginado({vgamesPerPage, allVgames, paginado, value}){
    const pageNumbers=[]
    for(let i=1; i<=Math.ceil(allVgames/vgamesPerPage);i++){
        pageNumbers.push(i)
    }
    return (
        <div>
          <div className= "div-paginado">
            {pageNumbers && pageNumbers.map(number => (
              <div className= "btn-pag" key={number.toString()} >
                <button 
                    className= {number === value? 'actual' : 'boton-paginado'} 
                    onClick={() => paginado(number)}>
                  {number}
                </button>
              </div>
            ))}
          </div>
        </div>
      );
};