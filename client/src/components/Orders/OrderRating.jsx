import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { orderBy_Rating } from '../../redux/actions/index';

export default function OrderRating({paginaLocal}) {
    let dispatch = useDispatch();
    const [order, setOrder] = useState("");

    function handleRatingOrder(e) {
        e.preventDefault();
        dispatch(orderBy_Rating(e.target.value));
        console.log(e.target.value);
        paginaLocal(1);
        setOrder(e.target.value);
    };

    return (
        <div>
            <p><u>Order by:</u></p>
            <select name="order-rating" id="s2" onChange={handleRatingOrder} >
            <option value="intial">Rating</option>
                <option value="low">Lower Rating</option>
                <option value="top">Top Rating</option>
            </select>
        </div>
    );
};
