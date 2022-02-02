import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVgames } from "../../redux/actions/index";


export default function SearchBar({paginaLocal}) {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChanges(e) {
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if(name){
            dispatch(getNameVgames(name));
            setName('');
        }
        paginaLocal(1);
    };

    return(
        <div>
            {
                <form>
                    <input
                        className="input-search"
                        pattern="[a-zA-Z]{2,254}"
                        value={name}
                        required
                        placeholder="Search for a game..."
                        onChange={(e) => handleInputChanges(e)}
                    />
                    <button
                        className="btn-search-bar" type="submit" onClick={(e) => handleSubmit(e)}>
                        SEARCH
                    </button>
                </form>
            }
        </div>
    );
};