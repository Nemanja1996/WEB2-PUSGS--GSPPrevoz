import { Component, OnInit, NgZone } from '@angular/core';
import { Polyline } from 'src/app/models/map/polyline';
import { Station } from 'src/app/models/Station';
import { GetAllStationsHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-station',
  templateUrl: './change-station.component.html',
  styleUrls: ['./change-station.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class ChangeStationComponent implements OnInit {
  public zoom: number;
  stations: Array<Station> = [];
  imageUrl: string = "./assets/busicon.png";
  
  constructor(private ngZone: NgZone, private httpStation: GetAllStationsHttpService, private router: Router){
  
  }

  ngOnInit() {
    this.httpStation.getAll().subscribe((data)=>{
      Object.assign(this.stations, data);
    });
    console.log(this.stations);
  }

}
