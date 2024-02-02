import React from "react";
import {Tabs} from "antd";

import "./NavBar.css";

const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Search',

    },
    {
        key: '2',
        label: 'Rated',

    },

];

export default class NavBar extends React.Component {

    render() {
        return (
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered/>
        )
    }
}