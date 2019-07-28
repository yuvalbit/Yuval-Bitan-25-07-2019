import { Favorite } from './../../models/extra.model';
import { LocalStorageService } from './../../services/local-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Favorite[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.updateFavorites();
  }

  updateFavorites() {
    this.favorites = this.localStorageService.getFavorites();
  }

  removeFavorite(item: Favorite) {
    this.localStorageService.removeFavorite(item);
    this.updateFavorites();
  }

}
