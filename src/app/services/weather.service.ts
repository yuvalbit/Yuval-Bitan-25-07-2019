import { LocationCords } from './../models/location.model'
import { FiveDayHeadLine, FiveDayWeather } from './../models/weather.model';
import { City } from './../models/city.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'T0mZFpvYNtTgBBVeNyVlAfPJOL6B4gZe';
  baseurl = 'http://dataservice.accuweather.com';

  constructor(private http: HttpClient) { }

  getAutocomplete(text: string) {
    return this.http.
      get<{ message: City[] }>(`${this.baseurl}/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${text}`);
  }
  getCurrentWeather(locationKey: number) {
    return this.http.
      get<{ message: Weather }>(`${this.baseurl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}&details=false`);
  }
  getCurrentWeatherGeolocation(data: LocationCords) {
    return this.http.
      get<{Key: string, LocalizedName: string}>(`${this.baseurl}/locations/v1/cities/geoposition/search?apikey=${this.apiKey}&q=${data.x},${data.y}`);
  }
  getFiveDayForecasts(locationKey: number, metric: boolean) {
    return this.http.
      get<{DailyForecasts: FiveDayWeather, Headline: FiveDayHeadLine }>(`${this.baseurl}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}&metric=${metric}`);
  }
}
