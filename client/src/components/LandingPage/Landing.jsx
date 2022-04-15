import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideoGames } from "../../redux/actions/index";
import {Link} from 'react-router-dom';
import LoaderHome from "../LoaderHome/LoaderHome.jsx";
import './Landing.css'

export default function Landing() {
    const dispatch = useDispatch();
    const allVgames = useSelector((state) => state.videogames);

    useEffect(() => {
        dispatch(getVideoGames());
      }, [dispatch]);

      if (!allVgames?.length) {
        return <LoaderHome  className='loader-home' />;
    }

    return(
        <div className="container-landing">
            <div className="link-home">
                <Link to='/home' style={{textDecoration:"none"}}>
                {/* <h1>#Gamming.Life</h1>  <br /> */}
                    <button className="access-btn">Check it!</button>
                </Link>
            </div>
        </div>
    );
};