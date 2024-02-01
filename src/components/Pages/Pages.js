import React from "react";
import Search from "../Search/Search";
import Rated from "../Rated/Rated.js"

import "./Pages.css"
import NavBar from "../NavBar/NavBar";

export default class Pages extends React.Component {
    render() {
        return (
            <>
            <NavBar />
            <Search />
            <Rated />
            </>
        )
    }
}