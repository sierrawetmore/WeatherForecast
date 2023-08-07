import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import SevereColdIcon from "@mui/icons-material/SevereCold";
import WaterDropIcon from "@mui/icons-material/WaterDrop";

type IconProps = {
  info: string;
};

const Icon = ({ info }: IconProps) => {
  let icon;
  // TODO: this isn't an ideal way of mapping these, but will work for now
  if (info.toLowerCase().includes("sunny")) {
    icon = <WbSunnyIcon sx={{ fontSize: 70, color: "yellow" }} />;
  } else if (info.toLowerCase().includes("thunder")) {
    icon = <ThunderstormIcon sx={{ fontSize: 70, color: "grey" }} />;
  } else if (info.toLowerCase().includes("snow")) {
    icon = <SevereColdIcon sx={{ fontSize: 70, color: "grey" }} />;
  } else if (info.toLowerCase().includes("rain")) {
    icon = <WaterDropIcon sx={{ fontSize: 70, color: "lightskyblue" }} />;
  } else {
    // this will be the default
    icon = <WbCloudyIcon sx={{ fontSize: 70, color: "white" }} />;
  }
  return <div>{icon}</div>;
};
export default Icon;
