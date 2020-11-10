import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select
} from "@material-ui/core";
import { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from './LineGraph'
import "./App.css";

// https://disease.sh/v3/covid-19/countries
// https://disease.sh/v3/covid-19/all
// https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('WorldWide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // code inside here will run once component loads not again
    // this code the get all data for the world wide cases
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(() => {
    // code inside here will run once component loads not again
    // async -> send request, wait for it, do something with it
    const getCountriesData = async () => {
      await fetch ("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country, // United States, Palestine
          value: country.countryInfo.iso2, // USA, PS
        }));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    };
    getCountriesData(); //here you call the funcation the we created above
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    // here we check if we choose world wide will use api url for all
    // if not will use the country code we will choose it from dropdown mena
    const url = countryCode === 'WorldWide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url) 
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      // all of the data from country responce 
      setCountryInfo(data);
    })
  }

  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <h1>Palestine Covid 19 Tracker</h1>

        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="WorldWide">WorldWide</MenuItem>
            {
              countries.map(country=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
        <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>

      <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3>World Wide New Cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;
