import React from "react";
import { Flex, Spin } from 'antd';

import "./Loader.css"

export default class Loader extends React.Component {
    render() {
        return (
            <Flex align="center" gap="middle">
                <Spin
                    className="spinner"
                    size="large"/>
            </Flex>
        )
    }

}