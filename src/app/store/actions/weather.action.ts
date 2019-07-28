import { Action } from '@ngrx/store';

export const GET_AUTO_COMPLETE_CITIES = '[Weather] Get Auto Complete Cities';
export const GET_AUTO_COMPLETE_CITIES_SUCCESS = '[Weather] Get Auto Complete Cities Success';
export const GET_AUTO_COMPLETE_CITIES_FAILED = '[Weather] Get Auto Complete Cities Failed'

export const GET_CURRENT_WEATHER = '[Weather] Get Current Weather';
export const GET_CURRENT_WEATHER_SUCCESS = '[Weather] Get Current Weather Success';
export const GET_CURRENT_WEATHER_FAILED = '[Weather] Get Current Weather Failed';

export const GET_FIVE_DAY_WEATHER = '[Weather] Get Current Five Days Weather';
export const GET_FIVE_DAY_WEATHER_SUCCESS = '[Weather] Get Current Five Days Weather Success';
export const GET_FIVE_DAY_WEATHER_FAILED = '[Weather] Get Current Five Days Weather Failed';

export const GET_GEOLOCATION_WEATHER = '[Weather] Get Geo Location Weather';
export const GET_GEOLOCATION_WEATHER_SUCCESS = '[Weather] Get Geo Location Weather Success';
export const GET_GEOLOCATION_WEATHER_FAILED = '[Weather] Get Geo Location Weather Failed';

/*
  Auto Complete Actions
*/
export class GetAutoCompleteCities implements Action {
  readonly type = GET_AUTO_COMPLETE_CITIES;
  constructor(public payload: string) {}
}

export class GetAutoCompleteCitiesSuccess implements Action {
  readonly type = GET_AUTO_COMPLETE_CITIES_SUCCESS;
  constructor(public payload: any) {}
}

export class GetAutoCompleteCitiesFailed implements Action {
  readonly type = GET_AUTO_COMPLETE_CITIES_FAILED;
  constructor(public payload: any) {}
}


/*
  Weather Actions
*/
export class GetCurrentWeather implements Action {
  readonly type = GET_CURRENT_WEATHER;
  constructor(public payload: number) {}
}

export class GetCurrentWeatherSuccess implements Action {
  readonly type = GET_CURRENT_WEATHER_SUCCESS;
  constructor(public payload: any) {}
}

export class GetCurrentWeatherFailed implements Action {
  readonly type = GET_CURRENT_WEATHER_FAILED;
  constructor(public payload: any) {}
}

/*
  Five Days Actions
*/
export class GetFiveDayWeather implements Action {
  readonly type = GET_FIVE_DAY_WEATHER;
  constructor(public payload: any, public metric: boolean) {}
}

export class GetFiveDayWeatherSuccess implements Action {
  readonly type = GET_FIVE_DAY_WEATHER_SUCCESS;
  constructor(public payload: any) {}
}

export class GetFiveDayWeatherFailed implements Action {
  readonly type = GET_FIVE_DAY_WEATHER_FAILED;
  constructor(public payload: any) {}
}

/*
  GeoLocation Actions
*/
export class GetGeoLocation implements Action {
  readonly type = GET_GEOLOCATION_WEATHER;
  constructor(public payload: any) {}
}

export class GetGeoLocationSuccess implements Action {
  readonly type = GET_GEOLOCATION_WEATHER_SUCCESS;
  constructor(public payload: any) {}
}

export class GetGeoLocationFailed implements Action {
  readonly type = GET_GEOLOCATION_WEATHER_FAILED;
  constructor(public payload: any) {}
}

export type WeatherActions = 
  | GetAutoCompleteCities 
  | GetAutoCompleteCitiesSuccess 
  | GetAutoCompleteCitiesFailed 
  | GetCurrentWeather 
  | GetCurrentWeatherSuccess 
  | GetCurrentWeatherFailed 
  | GetFiveDayWeather 
  | GetFiveDayWeatherSuccess
  | GetFiveDayWeatherFailed 
  | GetGeoLocation 
  | GetGeoLocationSuccess 
  | GetGeoLocationFailed;



