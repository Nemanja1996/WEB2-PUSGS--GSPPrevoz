import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/Station';
import { GetAllStationsHttpService, DeleteStationHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-station',
  templateUrl: './delete-station.component.html',
  styleUrls: ['./delete-station.component.css'],
  styles: ['agm-map {height: 450px; width: 550px;}']
})
export class DeleteStationComponent implements OnInit {
  public zoom: number;
  stations: Array<Station> = [];
  imageUrl: string = "./assets/busicon.png";
  selectedStation: Station = undefined;
  message: string = "";
  
  constructor(private ngZone: NgZone, private httpDeleteStation:DeleteStationHttpService, private httpStation: GetAllStationsHttpService, private router: Router){
  }

  ngOnInit() {
    this.httpStation.getAll().subscribe((data)=>{
      Object.assign(this.stations, data);
    });
    console.log(this.stations);
  }

  getStation(station){
    this.selectedStation = station;
    console.log(this.selectedStation);
  }
  placeMarker($event){
    this.selectedStation = undefined;
    this.message="";
    console.log(this.selectedStation);
  }

  otkazi(){
    this.router.navigate(["admin", "stations"]);
  }
  deleteStation(){
    this.httpDeleteStation.delete(this.selectedStation.Id).subscribe((data)=>{
      if(data){
        this.message = "Uspesno ste obrisali stanicu"
      }
      else{
        this.message = "Neuspesno brisanje stanice";
      }
    });
  }
}
