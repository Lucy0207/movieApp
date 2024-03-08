import React from 'react';
import './Rating.css';
import { Rate } from 'antd';

export default class Rating extends React.Component {
  state = {
    rating: this.props.defaultValue || 0,
  };

  handleRateChange = (value) => {
    this.setState({ rating: value });
    this.props.onRateChange(value);
  };

  render() {
    const { rating } = this.state;
    return (
      <Rate
        allowHalf
        defaultValue={rating}
        count={10}
        className="movieCard-rate"
        onChange={this.handleRateChange}
        allowClear={false}
      />
    );
  }
}
