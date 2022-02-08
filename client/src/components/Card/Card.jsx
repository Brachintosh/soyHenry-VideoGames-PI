import React from "react";
import './Card.css';

export default function Card({id, name, background_image, rating, genres}) {
    return(
        <div className="card-container">
            <div key={id}>
                <h3>{name}</h3>
                <div className="genres-info">
                    <label>Genres:</label>
                    <h4>{ genres }</h4>
                </div>
                <img className='vg-img' src={background_image} alt="img not found" width='330px' height='250px' />
                <div className="rating-info">
                    <label>Rating:</label>
                    <h4>{rating}</h4>
                </div>
            </div>
        </div>
    );
};