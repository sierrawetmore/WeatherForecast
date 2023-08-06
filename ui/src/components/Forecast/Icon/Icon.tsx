import React, { useState } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import SevereColdIcon from "@mui/icons-material/SevereCold";
import AirIcon from "@mui/icons-material/Air";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

type IconProps = {
  info: string;
};

const Icon = ({ info }: IconProps) => {
  //   const [icon, setIcon] = useState<any>("");
  let icon;
  // TODO: actually map these properly
  if (info.toLowerCase().includes("sunny")) {
    icon = <WbSunnyIcon sx={{ fontSize: 70, color: "yellow" }} />;
    // setIcon(<WbSunnyIcon sx={{ fontSize: 40, color: "yellow" }} />);
  } else if (info.toLowerCase().includes("thunder")) {
    icon = <ThunderstormIcon sx={{ fontSize: 70, color: "grey" }} />;
  } else if (info.toLowerCase().includes("snow")) {
    icon = <SevereColdIcon sx={{ fontSize: 70, color: "grey" }} />;
  } else if (info.toLowerCase().includes("rain")) {
    icon = <WaterDropIcon sx={{ fontSize: 70, color: "lightblue" }} />;
  }
  //  else if (info.includes("showers")) {
  //   setIcon(<WaterDropIcon sx={{ fontSize: 40, color: "blue" }} />);
  // } else {
  //   setIcon(<ThunderstormIcon sx={{ fontSize: 40 }} />);
  // }
  return <div>{icon}</div>;
};
export default Icon;
