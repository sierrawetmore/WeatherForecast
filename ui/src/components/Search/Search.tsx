import React, { useEffect, useReducer, useRef, useState } from "react";
import { GeoResponse } from "../../types/geoTypes";
import {
  GridpointForecastGeoJson,
  GridpointForecastPeriod,
  PointGeoJson,
} from "../../types/weatherTypes";
import { errorReducer } from "../../reducers/Search";
import { TEST_FORECAST_DATA } from "../Forecast/TestForecastData";
import "./Search.css";

type SearchProps = {
  setData: React.Dispatch<
    React.SetStateAction<GridpointForecastPeriod[] | null>
  >;
  setShortAddress: React.Dispatch<React.SetStateAction<string>>;
};

const initalError = {
  showError: false,
  errorMessage: "",
};

const Search = ({ setData, setShortAddress }: SearchProps) => {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [{ showError, errorMessage }, dispatch] = useReducer(
    errorReducer,
    initalError
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const onSearch = () => {
    if (!inputRef?.current?.value) {
      // notify use that their address is empty
      dispatch({
        type: "error",
        error: "Whoops! You forgot to enter an address!",
      });
      setData(null);

      return;
    }

    // reset
    dispatch({ type: "success" });

    getGeo();
  };

  useEffect(() => {
    if (coords) {
      getWeatherGrid();
    }
  }, [coords]);

  async function getGeo() {
    try {
      const response = await fetch(
        "http://localhost:3001/geo/" +
          new URLSearchParams({
            address: inputRef?.current?.value ?? "",
          })
      )
        .then((res) => res.json())
        .then(({ result }: GeoResponse) => {
          return result.addressMatches;
        });

      console.log(response);
      if (response && response.length) {
        // I haven't seen a scenario yet where there is more than one record here
        setCoords(response[0].coordinates);

        const city = response[0].addressComponents.city.toLowerCase();
        const state = response[0].addressComponents.state.toUpperCase();
        const formattedShortAddress = [
          city[0].toUpperCase() + city.slice(1),
          state,
        ].join(", ");
        setShortAddress(formattedShortAddress);
      } else {
        dispatch({ type: "error", error: "No results found" });
        setData(null);
      }
    } catch (err) {
      console.error(err);
      setData(null);
    }
  }

  async function getWeatherGrid() {
    try {
      const response: PointGeoJson = await fetch(
        `https://api.weather.gov/points/${coords?.y.toFixed(
          4
        )},${coords?.x.toFixed(4)}`
      ).then((res) => res.json());

      const { forecast } = response.properties;

      const forecastResp: GridpointForecastGeoJson = await fetch(forecast).then(
        (res) => res.json()
      );
      // Using TEST_FORECAST_DATA as fallback here because api is currently down
      const periods = forecastResp?.properties?.periods ?? TEST_FORECAST_DATA;
      // const { periods } = forecastResp?.properties;
      console.log(periods);
      setData(periods);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="search-element">
      <form>
        <input
          ref={inputRef}
          id="address-input"
          name="address-input"
          placeholder="Enter an address to see the 7-day forecast"
          onMouseOver={() => {
            document.getElementById("address-input")?.focus();
          }}
          onMouseOut={() => {
            document.getElementById("address-input")?.blur();
          }}
          required
          type="text"
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
      {showError ? (
        <span
          className="search-element__error"
          data-testid="search-element__error"
        >
          {errorMessage}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
