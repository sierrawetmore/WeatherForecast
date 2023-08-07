import React, { useCallback, useEffect, useState } from "react";
import Tile from "./Tile/Tile";
const Forecast = ({ data }: any) => {
  console.log(data);
  return (
    <div>
      {!data ? (
        <div>Nothing to see here</div>
      ) : (
        <div
          className="tile-group"
          style={{
            backgroundColor: "lightblue",
            display: "flex",
            justifyContent: "center",
            maxWidth: "700px",
            overflow: "auto",
          }}
        >
          {data.map((d: any) => {
            return <Tile day={d} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Forecast;
