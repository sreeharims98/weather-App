import React, { Component } from "react";
import "./App.css";
import { Button, Input, Typography } from "antd";
import WeatherComp from "./WeatherComp";
import "./logo.png";

const { Title } = Typography;
const API_key = "6154816b7e72c68621e01071c3a2d0bc";
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      cityDisplay: "",
      country: "",
      temp: "",
      cod: "",
      iconId: "",
      icon: "",
    };
  }

  getWeather = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=${API_key}`
    );
    const data = await response.json();
    console.log(data);
    this.setState({ cod: data.cod });
    const fah = parseFloat(data.main.temp);
    const cel = parseInt(fah - 273.15);
    this.setState({
      cityDisplay: data.name,
      country: data.sys.country,
      temp: cel,
      weather: data.weather[0].main,
      iconId: data.weather[0].icon,
      cityName: "",
    });
  };

  onChangeHandler = (e) => {
    this.setState({
      cityName: e.target.value,
    });
  };

  onSubmitHandler = (e) => {
    this.setState({
      cityName: this.capitalizeFirstLetter(this.state.cityName),
    });
    e.preventDefault();
    //console.log(this.state.city);
    this.getWeather();
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  isWeatherCompTrue = () => {
    if (this.state.cod === "404") {
      return (
        <div>
          <h1 style={{ color: "red", marginTop: "20px" }}>
            City Not Found....!!!!
          </h1>
          {window.location.reload(true)}
        </div>
      );
    } else if (this.state.cod >= 1) {
      return (
        <WeatherComp
          city={this.state.cityDisplay}
          country={this.state.country}
          temp={this.state.temp}
          weather={this.state.weather}
          iconId={this.state.iconId}
        />
      );
    }
  };

  render() {
    return (
      <div className="App">
        <div className="head">
          <Title className="">
            <span style={{ color: "orange" }}>Weather</span>{" "}
            <img src="./logo.png" alt="icon" height="100px" width="100px" />{" "}
            <span style={{ color: "blue" }}>Finder</span>
          </Title>
        </div>
        <form onSubmit={this.onSubmitHandler}>
          <Input
            placeholder="Enter a City Name"
            className="input-city"
            value={this.state.cityName}
            onChange={this.onChangeHandler}
            autoFocus={true}
            required
          />
          <Button type="primary" className="btn" htmlType="submit">
            Search
          </Button>
        </form>
        {this.isWeatherCompTrue()}
      </div>
    );
  }
}

export default App;
