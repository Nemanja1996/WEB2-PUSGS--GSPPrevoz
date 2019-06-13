import { Component, OnInit, NgZone } from '@angular/core';
import { Polyline } from 'src/app/models/map/polyline';
import { Station } from 'src/app/models/Station';
import { GetAllStationsHttpService, ChangeStationHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';
import { GeoLocation } from 'src/app/models/map/geolocation';
import { Validators, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-station',
  templateUrl: './change-station.component.html',
  styleUrls: ['./change-station.component.css'],
  styles: ['agm-map {height: 450px; width: 550px;}']
})
export class ChangeStationComponent implements OnInit {
  public zoom: number;
  stations: Array<Station> = [];
  imageUrl: string = "./assets/busicon.png";
  location: GeoLocation = new GeoLocation(1, 1);
  station: Station = new Station();
  message: string = "";

  changeStationForm= this.fb.group({
    longitude:['', Validators.required],
    latitude:['', Validators.required],
    name: ['', Validators.required],
    address: ['', Validators.required],
  });
  
  constructor(private ngZone: NgZone, private httpChangeStation: ChangeStationHttpService, private httpStation: GetAllStationsHttpService, private router: Router , private fb: FormBuilder){
  
  }

  ngOnInit() {
    this.httpStation.getAll().subscribe((data)=>{
      Object.assign(this.stations, data);
    });
    console.log(this.stations);
  }

  getStation(station){
    this.changeStationForm.patchValue({'address': station.Address, 'name': station.Name, 'latitude':station.Latitude, 'longitude':station.Longitude});
    this.station= station;
    console.log(this.station);
  }

  placeMarker($event){
    this.location = new GeoLocation($event.coords.lat, $event.coords.lng);
    this.station.Longitude = $event.coords.lng;
    this.station.Latitude = $event.coords.lat;
    this.changeStationForm.patchValue({'latitude':this.station.Latitude, 'longitude':this.station.Longitude});
    this.message = "";
  }

  changeStation(){
    this.station.Name = this.changeStationForm.value.name;
    this.station.Address = this.changeStationForm.value.address;
    
    this.httpChangeStation.put(this.station.Id, this.station).subscribe((data)=>{
      if(data){
        this.message = "Stanica je uspesno izmenjena";
      }
      else{
        this.message = "Neuspesna izmena stanice";
      }
    },(error:HttpErrorResponse) => {
      console.log(error.error);
      this.message = JSON.stringify(error.error);
  });
  }

  otkazi(){
    this.router.navigate(["admin", "stations"]);
  }
}
