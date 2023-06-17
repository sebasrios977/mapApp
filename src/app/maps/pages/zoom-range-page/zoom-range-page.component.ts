import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {


  public currentZoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-73.633, 4.15);

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {
    if(!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });

    this.mapListeners();
  }

  mapListeners() {
    if(!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (e) => {
      this.currentZoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (e) => {
      if(this.map!.getZoom() < 16) return;

      this.map!.zoomTo(16);
    });

    this.map.on('moveend', () => {
      this.currentLngLat = this.map!.getCenter();
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.currentZoom = Number(value);
    this.map?.zoomTo(this.currentZoom);
  }


}
