import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

const Search = ({ setData }: any) => {
  const [addressInput, setAddressInput] = useState<string>("");
  const debounceAddressInput = useCallback(debounce(handleDebounce, 1000), []);

  // this type is wrong
  const [coords, setCoords] = useState<{ x: string; y: string }>({
    x: "",
    y: "",
  });

  // const [forecastData, setForecastData] = useState<any>();

  useEffect(() => {
    // console.groupCollapsed("Coords");
    // console.log(coords);
    if (coords.x && coords.y) {
      getWeatherGrid();
    }
    // console.groupEnd();
  }, [coords]);

  function handleDebounce(input: string) {
    setAddressInput(input);
  }

  const onSearch = () => {
    if (!addressInput) {
      // notify use that their address is empty
      console.log("EMPTY ADDRESS");
      return;
    }
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
        .then(({ result }) => {
          return result.addressMatches;
        });
      // .finally(() => {
      //   // could update loading state here
      //   console.log();
      // });
      // console.log(response);
      setCoords(response[0].coordinates);
      // TODO Error check
      // TODO types
      // return response[0].coordinates;
    } catch (err) {
      console.error(err);
    }
  }

  async function getWeatherGrid() {
    try {
      const response = await fetch(
        "https://api.weather.gov/points/38.8894,-77.0352"
      ).then((res) => res.json());

      // console.log(response);
      // console.log(response.properties);
      let { cwa, gridX, gridY, forecast } = response.properties;
      // console.log(cwa, gridX, gridY, forecast);

      const forecastResp = await fetch(forecast).then((res) => res.json());
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
          name="address-input"
          autoFocus
          // not working?
          autoComplete="on"
          placeholder="Enter an address"
          onChange={(e) => {
            debounceAddressInput(e.target.value);
          }}
          required
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onSearch();
          }}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
