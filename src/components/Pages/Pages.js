import React from "react";
import Search from "../Search/Search";
import Rated from "../Rated/Rated.js"
import NavBar from "../NavBar/NavBar";

import "./Pages.css"

export default class Pages extends React.Component {
    render() {
        return (
            <>
            <NavBar className="navigation"/>
            <Search />
            <Rated />
            </>
        )
    }
}