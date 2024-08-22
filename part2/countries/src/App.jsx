import { useEffect, useState } from "react";
import countryService from "./services/countries";
import CountryList from "./components/CountryList";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [singleCountry, setSingleCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isShowCountry, setIsShowCountry] = useState(false);
  const [name, setName] = useState(null);
  const isShowList =
    filteredCountries.length <= 10 && filteredCountries.length !== 1;
  const isSingleCountry =
    filteredCountries.length === 1 && filteredCountries.length > 0;
  const message = "Too many matches, specify another filter";

  useEffect(() => {
    countryService.getAllCountries().then((response) => setCountries(response));
  }, []);

  useEffect(() => {
    if (isSingleCountry || isShowCountry) {
      countryService
        .getCountry(isSingleCountry ? filteredCountries[0].name.common : name)
        .then((resp) => setSingleCountry(resp));
    }
  }, [isSingleCountry || isShowCountry]);

  const handleCountryChange = (e) => {
    const item = e.target.value;
    setCountry(item);
    const searchCountries = countries.filter(
      (el) => item && el.name.common.toLowerCase().includes(item.toLowerCase())
    );
    setFilteredCountries(searchCountries);
  };

  const handleShowCountry = (name) => {
    setIsShowCountry(true);
    setName(name);
  };

  return (
    <>
      <div>
        find countries
        <input value={country} onChange={handleCountryChange}></input>
        {isShowList && !isShowCountry && (
          <CountryList
            list={filteredCountries}
            onShowInfo={handleShowCountry}
          />
        )}
        <div>{!isShowList && !isSingleCountry && message}</div>
        {(isSingleCountry || isShowCountry) && !!singleCountry && (
          <Country country={singleCountry} />
        )}
      </div>
    </>
  );
};

export default App;
