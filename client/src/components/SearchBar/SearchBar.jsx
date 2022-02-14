import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVgames } from "../../redux/actions/index";
import './SearchBar.css';

export default function SearchBar({paginaLocal}) {

    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChanges(e) {
        e.preventDefault();
        setName(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        if(!name.length){
            alert("Please enter a VideoGame name...");
        } else {
            dispatch(getNameVgames(name));
            setName('');
        }
        paginaLocal(1);
    };

    return <div className="box">
            {
                <form className="search">
                    <input className="input"
                        type="search"   name="search"   pattern=".*\S.*"    required
                        value={name}
                        placeholder="Search for a game..."
                        onChange={(e) => handleInputChanges(e)}
                    />
                    <button
                        className="search-btn" type="submit" onClick={(e) => handleSubmit(e)}>
		                <span>Search</span>
                    </button>
                </form>
            }
            <i class="fas fa-search"></i>
        </div>
};