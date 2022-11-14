import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  sideMenu = [
    { title: 'Toys Factory', url: '/delivery-list', icon: 'game-controller' },
    { title: 'Delivery', url: '/delivery-list', icon: 'gift' }
  ];

  constructor() {}
}
