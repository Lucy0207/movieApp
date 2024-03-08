import React from 'react';
import { Tabs } from 'antd';

import Search from '../Search/Search';
import Rated from '../Rated/Rated';

const NavBar = ({ pageTab, onPageTabChange, guestSessionId, onMovieRate, onMapMovies, onGetRatedMovies }) => {
  const tabsItems = [
    {
      key: 'Search',
      label: 'Search',
      children: (
        <Search pageTab={pageTab} guestSessionId={guestSessionId} onMovieRate={onMovieRate} onMapMovies={onMapMovies} />
      ),
    },
    {
      key: 'Rated',
      label: 'Rated',
      children: (
        <Rated
          pageTab={pageTab}
          onMapMovies={onMapMovies}
          onGetRatedMovies={onGetRatedMovies}
          guestSessionId={guestSessionId}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey="Search" centered items={tabsItems} onChange={onPageTabChange} />;
};

export default NavBar;
