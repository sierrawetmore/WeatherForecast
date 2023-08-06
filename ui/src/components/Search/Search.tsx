import React, { useCallback, useEffect, useReducer, useState } from "react";
import { debounce } from "lodash";
import { GeoResponse } from "../../types/geoTypes";
import {
  GridpointForecastGeoJson,
  GridpointForecastPeriod,
  PointGeoJson,
} from "../../types/weatherTypes";
import { errorReducer } from "../../reducers/Search";
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
  const [addressInput, setAddressInput] = useState<string>("");
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [{ showError, errorMessage }, dispatch] = useReducer(
    errorReducer,
    initalError
  );

  const handleDebounce = (input: string) => {
    setAddressInput(input);
  };

  const debounceAddressInput = useCallback(debounce(handleDebounce, 500), []);

  const onSearch = () => {
    if (!addressInput) {
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
          autoComplete="on"
          placeholder="Enter an address to see the 7-day forecast"
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
      {showError ? (
        <span className="search-element__error">{errorMessage}</span>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
