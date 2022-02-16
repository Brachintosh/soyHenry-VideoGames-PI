import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderBy_AZ } from '../../redux/actions/index';

export default function OrderAZ({paginaLocal}) {
    let dispatch = useDispatch();
    // eslint-disable-next-line
    const [order, setOrder] = useState("");

    function handleOnChanges(e){
        e.preventDefault();
        console.log(e.target.value)
        dispatch(orderBy_AZ(e.target.value));
        paginaLocal(1);
        setOrder(e.target.value);
    };

    return(
        <div>
            <p><u>Order by:</u></p>
            <select name="select" id="s1" onChange={handleOnChanges} >
                <option value="intial">Alphabetical</option>
                <option value="asc">A - Z</option>
                <option value="desc">Z - A</option>
            </select>
        </div>
    )
};