import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, filterBy_Genre } from "../../redux/actions/index";

export default function FilterGenres({paginaLocal}) {

    const dispatch = useDispatch();

    const allGenres = useSelector(state => state.genres);

    useEffect(() =>{
        dispatch(getGenres());
    }, [dispatch]);

    function handleFilterGenres(e) {
        e.preventDefault();
        dispatch(filterBy_Genre(e.target.value));
        paginaLocal(1);
    };

    return (
        <div>
            <p><u>Select from:</u></p>
            <select name="filter-genres" id="f2" onChange={(e) => handleFilterGenres(e)} >
                <option value="initial" key="genres">Genres</option>
                <option value="all" key="all">All</option>
                {
                   allGenres && allGenres.map((g) => (
                        <option key={g.name} value={g.name}>
                            {g.name}
                        </option>
                    ))
                }
            </select>
        </div>
    )
};