import React, { useEffect, useState } from "react";
import './Details.css';
import { useParams } from "react-router";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import LoaderHome from "../LoaderHome/LoaderHome";

export default function Details(){
    const [vGameDetails, setvGameDetails] = useState();
    let {id} = useParams();
    
    useEffect(() => {
        axios.get(`/videogame/${id}`)
            .then((responseBack) => {
                setvGameDetails(responseBack.data)
            })

            return() => {
                setvGameDetails(null)   // CleanUp
            }
    }, [id]);

    return (
        <div className="details-container">
                {/* HASTA QUE NO CARGUEN LOS DATOS HAY UN SPINNER DE "LOADING..." */}
            {
                vGameDetails ?
                <div>
                    <div className="left" >
                        <h2><u>{vGameDetails.name}:</u></h2><br />
                        <img src={vGameDetails.background_image} alt="Img of videogames" style={{width: '550px', height:'330px', borderRadius:'4.3%', boxShadow: '-1.2px -1.10px 6.10px rgba(247, 243, 18, 0.897)'}}/> <br />
                    </div>
                    <div className="info-details">
                        <div className="info-card">
                            <ul><h3><u>Platforms:</u></h3> 
                            <div className="info-center"> {vGameDetails.id?.length > 7 ? vGameDetails.platforms?.map(el => el.name).join(' || ')
                                                                                        : vGameDetails.platforms?.map(el => el.platform.name).join(' || ') }. </div> </ul><br />
                        </div>                                                                                    
                        <div className="info-card">
                            <ul><h3><u>Rating:</u></h3> 
                            <div className="info-center" style={{paddingTop:'20px'}}>{vGameDetails.rating}</div> </ul><br />
                        </div>
                        <div className="info-card">
                            <ul><h3><u>Genres:</u></h3> 
                           <div className="info-center"> {vGameDetails.genres?.map(el => el.name).join(', ')}.</div></ul><br />
                        </div>
                        <div className="info-card">
                        <ul><h3><u>Release Date:</u></h3> 
                            <div className="info-center">{vGameDetails.released || vGameDetails.releaseDate}.</div></ul>
                    </div> 
                    </div>
                        <div className="info-desc">
                            <ul><h3><u>Description:</u></h3><p id='text' ><strong> {vGameDetails.description_raw || vGameDetails.description } </strong></p></ul>
                        </div>
               </div>                
                :
                // SPINNER WHILE IT'S LOADING //
                <LoaderHome  className='loader' />
            }

            <Link to={'/home'} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <button><h4>Back to Home</h4></button>
            </Link><br />
        </div>
    );
};