import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const apiKey = import.meta.env.VITE_SOME_KEY;

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then((resp) => resp.data);
};

const getCountry = (country) => {
  const request = axios.get(`${baseUrl}/name/${country}`);
  return request.then((resp) => resp.data);
};

const getWeather = (city) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  return request.then((resp) => resp.data);
};

export default { getCountry, getAllCountries, getWeather };
