import React from "react";

import "./app.css";
import Pages from "../Pages/Pages";

export default class App extends React.Component {
    render() {
        return (
            <div className="movieApp">
                <Pages />
            </div>
        )
    }
}