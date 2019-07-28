import { BehaviorSubject } from 'rxjs';
import { UiService } from './ui.service';
import { Favorite } from './../models/extra.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  citySubject = new BehaviorSubject(null);
  currentCity = this.citySubject.asObservable();

  constructor(private uiService: UiService) { }
  
  public isExists(key: string) {
    var items = this.getFavorites();

    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (element.Weather.City.Key === key) {
        return true;
      }
    }

    return false;
  }

  public addFavorite(item: Favorite) {
    var items = this.getFavorites();

    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (element.Weather.City.Key === item.Weather.City.Key) {
        this.uiService.showSnackbar("City allready exists in favorites", null, 3000);
      }
    }

    items.push(item);
    localStorage.setItem('favorites', JSON.stringify(items));

    this.uiService.showSnackbar("City added to favorites", null, 3000);

  }

  public removeFavorite(item: Favorite) {
    var items = this.getFavorites();

    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (element.Weather.City.Key === item.Weather.City.Key) {
        items.splice(index, 1);
      }
    }

    localStorage.setItem('favorites', JSON.stringify(items));

    this.uiService.showSnackbar("City removed to favorites", null, 3000);
  }

  public getFavorites(): Favorite[] {
    var result: Favorite[] = [];

    if (JSON.parse(localStorage.getItem('favorites'))) {
      result = JSON.parse(localStorage.getItem('favorites'));
    }

    return result;
  }
}
