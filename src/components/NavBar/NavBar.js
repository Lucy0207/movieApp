import React from "react";

import "./NavBar.css";

export default class NavBar extends React.Component {
    render() {
        return (
            <>
                <button className="navigation-button navigation-button__active">Search</button>
                <button className="navigation-button">Rated</button>
            </>
        )
    }
}