import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aspirateur',
  templateUrl: './aspirateur.component.html',
  styleUrls: ['./aspirateur.component.scss'],
})
export class AspirateurComponent implements OnInit {
  @Input() dir: any;
  arrowIcons = {
    N: 'north',
    E: 'east',
    W: 'west',
    S: 'south',
  };
  constructor() {}

  ngOnInit(): void {}
}
