import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/Station';
import { GetAllStationsHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';
import { LineHttpService } from 'src/app/services/lines/line.service';
import { Line } from 'src/app/models/Line';

@Component({
  selector: 'app-admin-lines-grid',
  templateUrl: './admin-lines-grid.component.html',
  styleUrls: ['./admin-lines-grid.component.css'],
  styles: ['agm-map {height: 450px; width: 550px;}']
})
export class AdminLinesGridComponent implements OnInit {
  public zoom: number;
  stations: Array<Station> = [];
  imageUrl: string = "./assets/busicon.png";
  lines: Array<Line> = [];
  stationsArray: Station[] = [];
  selectedLine: Line = null;
  
  constructor(private ngZone: NgZone, private httpStation: GetAllStationsHttpService, private router: Router, private httpLines: LineHttpService){
  
  }

  ngOnInit() {
    this.httpStation.getAll().subscribe((data)=>{
      Object.assign(this.stations, data);
    });
    console.log(this.stations);

    this.httpLines.getAll().subscribe((data)=>{
      Object.assign(this.lines, data);
    });
  }

  showLine(){
    this.stationsArray = this.selectedLine.Stations;
    console.log(this.stationsArray);
  }

  addLine(){
    this.router.navigate(["admin", "addLine"]);
  }
  changeLine(){
    this.router.navigate(["admin", "changeLine"]);
  }
  deleteLine(){
    this.router.navigate(["admin", "deleteLine"]);
  }
}
