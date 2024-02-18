import React from "react";
import "./Rating.css";
import { Rate } from 'antd';

const Rating = () => <Rate allowHalf defaultValue={2.5} count={10} className="movieCard-rate" />;
export default Rating;