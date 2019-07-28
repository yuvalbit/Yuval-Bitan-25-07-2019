import { City } from './city.model';
import { Weather, FiveDayWeather, FiveDayHeadLine } from './weather.model';

export interface CurrentWeather {
    City: City;
    Weather: Weather;
}

export interface CurrentFiveDays {
    DailyForecasts: FiveDayWeather;
    Headline: FiveDayHeadLine;
}

export interface Favorite {
    Weather: CurrentWeather;
    FiveDays: CurrentFiveDays;
}