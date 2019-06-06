import { Component, OnInit, NgZone } from '@angular/core';
import { MarkerInfo } from 'src/app/models/map/marker-info.model';
import { Polyline } from 'src/app/models/map/polyline';
import { GeoLocation } from 'src/app/models/map/geolocation';
import { Station } from 'src/app/models/Station';
import { GetAllStationsHttpService } from 'src/app/services/station/station.service';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class StationsComponent implements OnInit {

  markerInfo: MarkerInfo;
  public polyline: Polyline;
  public zoom: number;
  stations: Array<Station> = [];
  
  constructor(private ngZone: NgZone, private httpStation: GetAllStationsHttpService){
  
  }

  ngOnInit() {
    this.markerInfo = new MarkerInfo(new GeoLocation(45.242268, 19.842954), 
    "assets/ftn.png",
    "Jugodrvo" , "" , "http://ftn.uns.ac.rs/691618389/fakultet-tehnickih-nauka");

    this.polyline = new Polyline([], 'blue', { url:"assets/busicon.png", scaledSize: {width: 50, height: 50}});
    this.httpStation.getAll().subscribe((data)=>{
      Object.assign(this.stations, data);
    });
    console.log(this.stations);
  }


  placeMarker($event){
    this.polyline.addLocation(new GeoLocation($event.coords.lat, $event.coords.lng))
    console.log(this.polyline)
  }

}
