import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/Station';
import { Line } from 'src/app/models/Line';
import { GetAllStationsHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';
import { LineHttpService } from 'src/app/services/lines/line.service';

@Component({
  selector: 'app-lines-grid',
  templateUrl: './lines-grid.component.html',
  styleUrls: ['./lines-grid.component.css'],
  styles: ['agm-map {height: 450px; width: 550px;}']
})
export class LinesGridComponent implements OnInit {
  public zoom: number;
  stations: Array<Station> = [];
  imageUrl: string = "./assets/busicon.png";
  lines: Array<Line> = [];
  stationsArray: Station[] = [];
  selectedLine: Line = null;

  constructor(private ngZone: NgZone, private httpStation: GetAllStationsHttpService, private router: Router, private httpLines: LineHttpService) { }

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

}
