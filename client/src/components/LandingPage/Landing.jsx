import React from "react";
import {Link} from 'react-router-dom';
import './Landing.css'

export default function Landing() {

    return(
        <div className="container-landing">
            <div className="link-home">
                <Link to='/home' style={{textDecoration:"none"}}>
                <h1>#Gamming.Life</h1>  <br />
                    <button className="access-btn">Check it!</button>
                </Link>
            </div>
        </div>
    );
};