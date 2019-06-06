import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/Station';
import { GetAllStationsHttpService, AddStationHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { GeoLocation } from 'src/app/models/map/geolocation';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class AddStationComponent implements OnInit {
  public zoom: number;
  stations: Array<Station> = [];
  imageUrl: string = "./assets/busicon.png";
  location: GeoLocation = new GeoLocation(1, 1);
  station: Station = new Station();
  message: string;

  addStationForm= this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
  });
  
  constructor(private ngZone: NgZone, private httpStation: GetAllStationsHttpService, private router: Router, private fb: FormBuilder , private httpAddStation: AddStationHttpService){
    
  }

  ngOnInit() {
    this.httpStation.getAll().subscribe((data)=>{
      Object.assign(this.stations, data);
    });
    console.log(this.stations);
  }

  otkazi(){
    this.router.navigate(["admin", "stations"]);
  }

  addStation(){
    this.station.Latitude = this.location.latitude;
    this.station.Longitude = this.location.longitude;
    this.station.Name = this.addStationForm.value.name;
    this.station.Address = this.addStationForm.value.address;
    this.httpAddStation.post(this.station).subscribe((data)=>{
      if(data){
        this.message = "Uspesno dodata stanica";
      }
      else{
        this.message = "Neuspesno dodavanje staice";
      }
    });
    console.log(this.station);
  }

  placeMarker($event){
    this.location = new GeoLocation($event.coords.lat, $event.coords.lng);
    console.log(this.location);
    this.message = "";
  }
}
