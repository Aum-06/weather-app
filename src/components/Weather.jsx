import React, { useState } from "react";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import humidityIcon from "../Assets/humidity.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";
import windIcon from "../Assets/wind.png";
import searchIcon from "../Assets/search.png";

const Weather = () => {
  const [city, setCity] = useState("");
  const [searchedCity, setSearchedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null); 

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleButtonClick = () => {
    search(city);
    setCity(""); 
  };

  const search = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_API_KEY
      }`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const icon = allIcons[data.weather[0].icon] || clear; 

      setWeatherData({
        temp: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        icon: icon,
      });

      setSearchedCity(city); 
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  return (
    <div className="min-w-[320px] min-h-[500px] bg-indigo-600 rounded-xl shadow-2xl p-8 flex flex-col items-center gap-3">
      
      <div className="flex justify-between bg-white p-3 rounded-full w-full max-w-[400px]">
        <input
          value={city}
          onChange={handleInputChange}
          type="text"
          className="bg-transparent outline-none w-full pl-4 text-lg placeholder:text-slate-600 placeholder:font-semibold"
          placeholder="Enter City"
        />
        <button className="ml-2" onClick={handleButtonClick}>
          <img
            src={searchIcon}
            alt="Search"
            className="rounded-full bg-transparent w-[24px] h-[24px]"
          />
        </button>
      </div>

      
      {weatherData ? (
        <>
          <div className="flex flex-col items-center gap-2 mt-2">
            <img
              src={weatherData.icon}
              alt="Weather Icon"
              className="w-[120px] h-[120px]"
            />
            <div className="flex flex-col text-white text-center">
              <span className="text-[70px] font-medium leading-none">
                {weatherData.temp}°C
              </span>
              <span className="text-[32px] font-normal">{searchedCity}</span>
            </div>
          </div>

          <div className="flex justify-between gap-16 mt-8 text-white">
            <div className="flex items-center gap-2">
              <img src={humidityIcon} alt="Humidity" className="size-6" />
              <div className="flex flex-col items-center gap-1 justify-start">
                <span className="font-medium text-xl">
                  {weatherData.humidity} %
                </span>
                <span className="text-sm">Humidity</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src={windIcon} alt="Wind" className="size-6" />
              <div className="flex flex-col items-center gap-1">
                <span className="font-medium text-xl">
                  {weatherData.wind} km/h
                </span>
                <span className="text-sm">Windspeed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-white text-xl mt-6">
          Enter a city to get the weather data.
        </div>
      )}
    </div>
  );
};

export default Weather;
