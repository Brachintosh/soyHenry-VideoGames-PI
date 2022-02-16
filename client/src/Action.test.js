
import { filterCreated, filterBy_Genre, orderBy_AZ, orderBy_Rating } from "./redux/actions/index.js";

//  getNameVgames, getGenres, getPlatforms, getDetails, postVgame,

let infoBack = [];

describe("Reducer-Actions Tests:", () => {

    it('It should return an action with the props type "FILTER_CREATED" & payload, the value is send as an argument:', () => {
        expect(filterCreated("eedeb11b-563b-4709-8a56-6778e26dfa7f")).toEqual({
        type: "FILTER_CREATED",
        payload: "eedeb11b-563b-4709-8a56-6778e26dfa7f",
        });
    });

    it('It should return an action with the props type "orderBy_AZ" & payload, the value is send as an argument:', () => {
        expect(filterBy_Genre("Action")).toEqual({
        type: "FILTER_BY_GENRES",
        payload: "Action",
        });
    }); 

    it('It should return an action with the props type "ORDER_AZ" & payload, the value is send as an argument:', () => {
        expect(orderBy_AZ("asc")).toEqual({
        type: "ORDER_AZ",
        payload: "asc",
        });
    }); 

    it('It should return an action with the props type "ORDER_RATING" & payload, the value is send as an argument:', () => {
        expect(orderBy_Rating("top")).toEqual({
        type: "ORDER_RATING",
        payload: "top",
        });
    });

});