import React from "react";
import {Link} from 'react-router-dom';

export default function Landing() {

    return(
        <div>
            <div>
                <h1>#Gamming.Life</h1>
                <Link to='/home' style={{textDecoration:"none"}}>
                    <button>Check it!</button>
                </Link>
            </div>
        </div>
    );
};