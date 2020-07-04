import React from "react";

import "./App.css";
import { Typography } from "antd";
const { Title } = Typography;

const WeatherComp = ({ city, country, temp, weather, iconId }) => {
  return (
    <div>
      <Title className="title">
        {city}, {country}
      </Title>
      <img
        src={`http://openweathermap.org/img/wn/${iconId}@4x.png`}
        alt="not found"
      />
      <Title className="weather">{weather}</Title>
      <Title className="degree">{temp}&deg;C</Title>
    </div>
  );
};
export default WeatherComp;
