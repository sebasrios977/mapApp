import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit {


  @Input()
  public lngLat?: [number, number];

  public currentZoom: number = 10;

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement) throw 'Map Div not found';
    if(!this.lngLat) throw 'LgnLat cant be null';

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
      interactive: false,
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map)
  }
}
