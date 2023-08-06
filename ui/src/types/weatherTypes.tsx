// I haven't seen these types exposed by the api anywhere,
// so I'm shaping them manually, but I could be missing a
// clear export for these somewhere
// using type 'any' in a few place to hand wave the unused types away

type Point = {
  "@context": any;
  geometry: any;
  "@id": string;
  "@type": string;
  cwa: string;
  forecastOffice: string;
  gridId: string;
  gridX: number;
  gridY: number;
  forecast: string;
  forecastHourly: string;
  forecastGridData: string;
  observationStations: string;
  relativeLocation: any;
  forecastZone: string;
  county: string;
  fireWeatherZone: string;
  timeZone: string;
  radarZone: string;
};
export type PointGeoJson = {
  "@context": any;
  id: string;
  type: string;
  geometry: any;
  properties: Point;
};

export type GridpointForecastGeoJson = {
  "@context": any;
  id: string;
  type: string;
  geometry: any;
  properties: GridpointForecast;
};
type GridpointForecast = {
  "@context": any;
  geometry: any;
  units: any;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  elevation: any;
  periods: GridpointForecastPeriod[];
};

// based on https://www.weather.gov/documentation/services-web-api#/default/alerts_active_region  #/components/schemas/GridpointForecastPeriod
export type GridpointForecastPeriod = {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: any;
  temperatureUnit: string;
  temperatureTrend: string | null;
  probabilityOfPrecipitation: any;
  dewpoint: any;
  relativeHumidity: any;
  windSpeed: any;
  windGust: any;
  windDirection: any;
  shortForecast: string;
  detailedForecast: string;
};
