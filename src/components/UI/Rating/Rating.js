import React from "react";
import "./Rating.css";
import { Rate } from 'antd';

export default class Rating extends React.Component {
   state= {
       rating: 0
   }

    handleRateChange = (value) => {

        this.setState({ rating: value });
        this.props.onRateChange(value);
    };

    render() {
        return <Rate allowHalf defaultValue={0} count={10} className="movieCard-rate" onChange={this.handleRateChange} />;
    }
}