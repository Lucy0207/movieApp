import React from "react";
import "./Search.css";
import MovieCardList from "../MovieCardList/MovieCardList";
import {Pagination} from "antd";

export default class Search extends React.Component {
    render() {
        return (
            <>

                <input />
                <MovieCardList />
                <Pagination />
            </>
        )
    }
}