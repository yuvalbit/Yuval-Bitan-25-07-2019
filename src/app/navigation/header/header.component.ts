import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

const THEME_DARKNESS_SUFFIX = `-dark`;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  
  constructor(private overlayContainer: OverlayContainer) {
  }

  ngOnInit() {
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
