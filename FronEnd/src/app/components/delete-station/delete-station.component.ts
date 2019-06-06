import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/Station';
import { GetAllStationsHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-station',
  templateUrl: './delete-station.component.html',
  styleUrls: ['./delete-station.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class DeleteStationComponent implements OnInit {
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
