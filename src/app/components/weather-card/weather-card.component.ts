import { LocalStorageService } from './../../services/local-storage.service';
import { CurrentWeather, CurrentFiveDays, Favorite } from './../../models/extra.model';
import { City } from './../../models/city.model';
import { UiService } from './../../services/ui.service';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromRoot from '../../store/reducers/app.reducer';
import * as weatherActions from '../../store/actions/weather.action';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  searchForm: FormGroup;
  
  loadingWeather: boolean = true;
  loadingFiveDays: boolean = true;

  metric: boolean = true;
  defaultKey: string = '215854';
  defaultCity: string = 'Tel Aviv';
  
  currentWeather: CurrentWeather;
  currentFiveDays: CurrentFiveDays;

  optionalCities: City[];

  fiveDaysSubscribe: Subscription;
  citiesSubscribe: Subscription;
  currentSubscribe: Subscription;

  unsubscribe: Subject<void> = new Subject<void>();
  currentWeatherSubject: Subject<void> = new Subject<void>();



  constructor(private uiService: UiService,
              private localStorageService: LocalStorageService,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.localStorageService.currentCity.subscribe(response => {
      if (response) {
        const data = { key: JSON.parse(response).key, city: JSON.parse(response).city };
        this.getWeather(data.key, data.city);
      } else {
        this.getMyLocation();
      }
    });

    this.searchForm = new FormGroup({
      search: new FormControl('', {
        validators: [
          Validators.required
        ]
      })
    });

    this.getAutoComplete(this.defaultCity);
    this.getWeather(this.defaultKey, this.defaultCity);
  }

  onInputChange($event): void{
    var input = $event.target.value;
    if (input.length > 0) {
      this.getAutoComplete(input);
    }
  }

  getAutoComplete(input: string) {
    this.store.dispatch(new weatherActions.GetAutoCompleteCities(input));
    this.citiesSubscribe = this.store.select(fromRoot.getWeatherData).pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        if (data.loaded) {
          this.optionalCities = data.autocompleate;
        }
      }, (error) => {
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  onSearch() {
    this.loadingFiveDays = true;
    this.loadingWeather = true;

    var value = this.searchForm.get("search").value;
    var change = true;
    if (this.currentWeather !== null && this.currentWeather !== undefined) {
      if (this.currentWeather.City.AdministrativeArea.LocalizedName === value) {
        change = false;
      }
    }

    if (!change) {
      this.loadingFiveDays = false;
      this.loadingWeather = false;
      return
    }

    this.getWeather(this.currentWeather.City.Key, value);
  }

  getCityByName(name: string) {
    if (this.optionalCities === null ||  this.optionalCities === undefined) {
        this.getAutoComplete(name);
    }

    for (let index = 0; index < this.optionalCities.length; index++) {
      const element = this.optionalCities[index];
      if (element.LocalizedName.toLowerCase() === name.toLowerCase()) {
        return element
      }
    }

    return null
  }

  getWeather(key: string, name: string, city?: any): void {
    const intKey = Number(key);
    this.store.dispatch(new weatherActions.GetCurrentWeather(intKey));
    this.currentSubscribe = this.store.select(fromRoot.getWeatherData).pipe(takeUntil(this.currentWeatherSubject))
    .subscribe((data) => {
      if (data.loaded) {
        if (city !== undefined && city !== null) {
          this.currentWeather = { City: city, Weather: data.weather[0] };
        } else {
          this.currentWeather = { City: this.getCityByName(name), Weather: data.weather[0] };
        }
        this.loadingWeather = false;
      }
    },
      (error) => {
        this.uiService.showSnackbar(error.message, null, 3000);
      });
      
    this.getFiveDayWeather(key);
  }

  getFiveDayWeather(key: string | number): void {
    const updateKey = Number(key);

    this.store.dispatch(new weatherActions.GetFiveDayWeather(updateKey, this.metric));
    this.fiveDaysSubscribe = this.store.select(fromRoot.getWeatherData).pipe(takeUntil(this.unsubscribe))
      .subscribe((data) => {
        if (data.loaded) {
            this.currentFiveDays = { DailyForecasts: data.fivedays.DailyForecasts, Headline: data.fivedays.Headline };
            this.loadingFiveDays = false;
        }
      },
        (error) => {
          this.uiService.showSnackbar(error.message, null, 3000);
        });

  }

  addToFavorite() {
    var favorite: Favorite = { Weather: this.currentWeather , FiveDays: this.currentFiveDays };
    this.localStorageService.addFavorite(favorite);
  }

  removeFromFavorite() {
    var favorite: Favorite = { Weather: this.currentWeather , FiveDays: this.currentFiveDays };
    this.localStorageService.removeFavorite(favorite);
  }

  getMyLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const x = position.coords.latitude;
        const y = position.coords.longitude;
        const location = { x, y };
        this.store.dispatch(new weatherActions.GetGeoLocation(location));
        const dataToSubscribeGeo = this.store.select(fromRoot.getWeatherData).pipe(takeUntil(this.unsubscribe))
          .subscribe((data) => {
            if (data.loaded) {
              localStorage.setItem('response', JSON.parse(JSON.stringify(data.geo)));
              this.defaultKey = data.geo.Key;
              this.defaultCity = data.geo.LocalizedName;
              this.getWeather(data.geo.Key, data.geo.LocalizedName, data.geo);
              dataToSubscribeGeo.unsubscribe();
            }
          }, (error) => {
            this.uiService.showSnackbar(error.message, null, 3000);
          });
      },
      () => {
        this.getWeather(this.defaultKey, this.defaultCity);
      });
    }
  }
}
