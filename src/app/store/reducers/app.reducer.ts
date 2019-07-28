import { 
  ActionReducerMap, 
  createFeatureSelector,
  createSelector 
} from '@ngrx/store';

import * as fromWeather from './weather.reducer';

export interface  State {
  weather: fromWeather.State;
}
export const Reducers: ActionReducerMap<State> = {
  weather: fromWeather.weatherReducer,
};

export const getWeatherReducer = createFeatureSelector<fromWeather.State>('weather');
export const getWeatherData = createSelector(getWeatherReducer, fromWeather.getWeatherData);