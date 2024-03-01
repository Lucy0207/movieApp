import React from "react";
import { Tabs } from "antd";
import Search from "../Search/Search";
import Rated from "../Rated/Rated";

const NavBar = ({ pageTab, onPageTabChange, guestSessionId, onMovieRate, onMapMovies, onGetRatedMovies }) => {

    return (
        <Tabs
            defaultActiveKey="Search"
            centered
            destroyInactiveTabPane={false}
            onChange={onPageTabChange}
        >
            <Tabs.TabPane tab="Search" key="Search">
                <Search pageTab={pageTab}
                        guestSessionId={guestSessionId} onMovieRate={onMovieRate} onMapMovies={onMapMovies}/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Rated" key="Rated">
                <Rated pageTab={pageTab}
                       onMapMovies={onMapMovies}
                       onGetRatedMovies={onGetRatedMovies}
                       guestSessionId={guestSessionId}/>
            </Tabs.TabPane>
        </Tabs>
    );
};

export default NavBar;