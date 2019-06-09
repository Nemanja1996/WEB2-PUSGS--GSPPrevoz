import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/Station';
import { GetAllStationsHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css'],
  styles: ['agm-map {height: 450px; width: 550px;}']
})
export class StationsComponent implements OnInit {
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

  addStation(){
    this.router.navigate(["admin", "addStation"]);
  }
  changeStation(){
    this.router.navigate(["admin", "changeStation"]);
  }
  deleteStation(){
    this.router.navigate(["admin", "deleteStation"]);
  }
}
