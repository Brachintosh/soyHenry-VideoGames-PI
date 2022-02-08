import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getVideoGames, filterCreated } from "../../redux/actions/index";

export default function FilterCreated({paginaLocal}) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideoGames());
    }, [dispatch]);

    function handleFilterCreated(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        paginaLocal(1);
    };

    return (
        <div>
            <p><u>Filter from:</u></p>
            <select name="filter-created" id="f1" onChange={handleFilterCreated} >
                <option value="initial">Games</option>
                <option value="all">All Games</option>
                <option value="api">API Games</option>
                <option value="created">DB Games</option>
            </select>
        </div>
    )
};