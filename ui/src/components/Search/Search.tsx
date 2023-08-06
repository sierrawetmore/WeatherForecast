import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { GeoResponse } from "../../types/geoTypes";
import {
  GridpointForecastGeoJson,
  GridpointForecastPeriod,
  PointGeoJson,
} from "../../types/weatherTypes";
import "./Search.css";

type SearchProps = {
  setData: React.Dispatch<
    React.SetStateAction<GridpointForecastPeriod[] | null>
  >;
};

const Search = ({ setData }: SearchProps) => {
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [addressInput, setAddressInput] = useState<string>("");
  const debounceAddressInput = useCallback(debounce(handleDebounce, 1000), []);

  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (coords) {
      getWeatherGrid();
    }
  }, [coords]);

  function handleDebounce(input: string) {
    setAddressInput(input);
  }

  const onSearch = () => {
    if (!addressInput) {
      // notify use that their address is empty
      setShowErrorMessage(true);
      setErrorMessage("Whoops! You forgot to enter an address...");
      setData(null);

      return;
    }
    // reset
    setShowErrorMessage(false);
    setErrorMessage("");
    console.log("search!");

    getGeo();
  };

  async function getGeo() {
    try {
      const response = await fetch(
        "http://localhost:3001/api/" +
          new URLSearchParams({
            address: addressInput,
          })
      )
        .then((res) => res.json())
        .then(({ result }: GeoResponse) => {
          return result.addressMatches;
        });

      if (response && response.length) {
        // I haven't seen a scenario yet where there is more than one record here
        setCoords(response[0].coordinates);
      } else {
        setErrorMessage("Sorry, no results matched this address");
        setShowErrorMessage(true);
        setData(null);
      }
    } catch (err) {
      console.error(err);
      setData(null);
    }
  }

  async function getWeatherGrid() {
    try {
      // const response = await fetch(
      //   "https://api.weather.gov/points/38.8894,-77.0352"
      // ).then((res) => res.json());

      const response: PointGeoJson = await fetch(
        `https://api.weather.gov/points/${coords?.y.toFixed(
          4
        )},${coords?.x.toFixed(4)}`
      ).then((res) => res.json());
      console.log(response);
      let { forecast } = response.properties;

      const forecastResp: GridpointForecastGeoJson = await fetch(forecast).then(
        (res) => res.json()
      );
      console.log(forecast, forecastResp, typeof forecastResp);
      let { periods } = forecastResp.properties;
      setData(periods);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="search-element">
      <form>
        <input
          id="address-input"
          name="address-input"
          autoFocus
          // not working?
          autoComplete="on"
          placeholder="Enter an address"
          onChange={(e) => {
            debounceAddressInput(e.target.value);
          }}
          onMouseOver={() => {
            document.getElementById("address-input")?.focus();
          }}
          onMouseOut={() => {
            document.getElementById("address-input")?.blur();
          }}
          required
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onSearch();
            e.currentTarget.blur();
          }}
          type="submit"
        >
          Search
        </button>
      </form>
      {showErrorMessage ? (
        <span className="search-element__error">{errorMessage}</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
