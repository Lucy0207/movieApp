import React from "react";
import MovieCardList from "../MovieCardList/MovieCardList";
import "./app.css";

export default class App extends React.Component {
    render() {
        return (
            <div className="movieApp">
            <MovieCardList />
            </div>
        )
    }
}