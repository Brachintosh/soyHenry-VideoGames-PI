import React, { useEffect, useState } from "react";
import './Details.css';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import axios from "axios";
import LoaderHome from "../LoaderHome/LoaderHome";

export default function Details(){
    const [vGameDetails, setvGameDetails] = useState(null);
    let {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/videogame/${id}`)
            .then((responseBack) => {
                setvGameDetails(responseBack.data)
            })

            return() => {
                setvGameDetails(null)   // CleanUp
            }
    }, [id]);

    return (
        <div className="details-container">
            <body>
                {/* HASTA QUE NO CARGUEN LOS DATOS HAY UN SPINNER DE "LOADING..." */}
            {
                vGameDetails ?
               
               <div className="info-details">
                   <h2><u>{vGameDetails.name}:</u></h2><br />
                   <img src={vGameDetails.background_image} alt="Img of videogames" style={{width: '400px', height:'330px', borderRadius:'4.3%'}}/> <br />
                   <ul><h3><u>Rating:</u></h3> {vGameDetails.rating} </ul><br />
                   <ul><h3><u>Platforms:</u></h3> {vGameDetails.id?.length > 7 ? vGameDetails.platforms?.map(el => el.name).join(' || ')
                                                                            : vGameDetails.platforms?.map(el => el.platform.name).join(' || ') }.</ul><br />
                   <ul><h3><u>Genres:</u></h3> {vGameDetails.genres?.map(el => el.name).join(', ')}.</ul><br />
                   <ul><h3><u>Release Date:</u></h3> {vGameDetails.released || vGameDetails.releaseDate}.</ul><br />
                   <ul><h3><u>Description:</u></h3><p id='text' ><strong> {vGameDetails.description_raw || vGameDetails.description } </strong></p></ul><br />
               </div> 

                :
                // SPINNER WHILE IT'S LOADING //
                <LoaderHome  className='loader' />
            // <div className="spinner">
            //    <div><br/><br/><br/><br/>
            //         <h1 className="name-loading"> Loading... </h1><br /><br /><br/><br/><br/>
            //         <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div><br/><br/><br/><br/><br/><br/><br/><br/>
            //    </div>
            // </div>

            }

            <Link to={'/home'}>
                <button><h2>Back to Home</h2></button>
            </Link><br /><br />

            </body>
        </div>
    );
};