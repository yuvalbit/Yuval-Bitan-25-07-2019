import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import * as weatherActions from '../actions/weather.action';

/*
  Weather effects
*/
@Injectable()
export class WeatherEffects {
  constructor(private actions$: Actions, private weatherService: WeatherService) { }

  @Effect()
  public weather$ = this.actions$.pipe(ofType(weatherActions.GET_AUTO_COMPLETE_CITIES))
    .pipe(exhaustMap((action: weatherActions.GetAutoCompleteCities) => {
      return this.weatherService.getAutocomplete(action.payload)
      .pipe(map(data => {
        return new weatherActions.GetAutoCompleteCitiesSuccess(data)
      }),
      catchError(error => of(new weatherActions.GetAutoCompleteCitiesFailed(error)
      ))
    );
  }));

  @Effect()
  public currentWeather$ = this.actions$.pipe(ofType(weatherActions.GET_CURRENT_WEATHER))
    .pipe(exhaustMap((action: weatherActions.GetCurrentWeather) => {
      return this.weatherService.getCurrentWeather(action.payload)
      .pipe(map(data => { 
        return new weatherActions.GetCurrentWeatherSuccess(data)
      }),
      catchError(error => of(new weatherActions.GetCurrentWeatherFailed(error)
      ))
    );
  }));

  @Effect()
  public fiveDayWeather$ = this.actions$.pipe(ofType(weatherActions.GET_FIVE_DAY_WEATHER))
    .pipe(exhaustMap((action: weatherActions.GetFiveDayWeather) => {
      return this.weatherService.getFiveDayForecasts(action.payload, action.metric)
      .pipe(map(data => { 
        return new weatherActions.GetFiveDayWeatherSuccess(data)
      }),
      catchError(error => of(new weatherActions.GetFiveDayWeatherFailed(error)
      ))
    );
  }));

  @Effect()
  public geolocation$ = this.actions$.pipe(ofType(weatherActions.GET_GEOLOCATION_WEATHER))
    .pipe(exhaustMap((action: weatherActions.GetGeoLocation) => {
      return this.weatherService.getCurrentWeatherGeolocation(action.payload)
      .pipe(map(data => { 
        return new weatherActions.GetGeoLocationSuccess(data) 
      }),
      catchError(error => of(new weatherActions.GetGeoLocationFailed(error)
      ))
    );
  }));
}