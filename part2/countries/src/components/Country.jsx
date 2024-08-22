import { useState, useEffect } from "react";
import countryService from "../services/countries";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const imgStyle = {
    height: "100px",
    width: "100px",
  };

  useEffect(() => {
    countryService.getWeather(country.capital).then((response) => {
      setWeather(response);
    });
  }, []);

  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`Flag of ${country.name.common}`}
        style={imgStyle}
      />
      <h2>Weather in {country.capital}</h2>
      {!!weather && (
        <>
          <div>temperature {weather.main.temp} Celcius</div>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={`Weather of ${country.name.common}`}
            style={imgStyle}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </>
      )}
    </>
  );
};

export default Country;
