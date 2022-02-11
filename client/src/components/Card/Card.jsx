import React from "react";
import './Card.css';

export default function Card({id, name, background_image, rating, genres}) {
    // console.log("soy genres de card >>>", genres)
    return(
        <div className="card-container">
            <div key={id}   className="card">
                <h3 className="card-name">{name}</h3>
                <div className="genres-info">
                    <label style={{paddingBottom:'5px',margin:'1%'}}><u>Genres:</u></label>
                    <h5 style={{paddingBottom:'5px',}}>{ genres }</h5>
                </div>
                <img className='vg-img' src={background_image} alt="img not found" width='200px' height='125px' />
                <div className="rating-info">
                    <label style={{justifySelf:'center', position:'static', paddingBottom:'6px', paddingTop:'4px', margin:'1%'}}><u>Rating:</u></label>
                    <h4>{rating}</h4>
                </div>
            </div>
        </div>
    );
};