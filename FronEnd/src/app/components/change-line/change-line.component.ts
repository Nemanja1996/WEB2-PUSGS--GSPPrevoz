import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/Station';
import { LineType } from 'src/app/models/LineType';
import { Line } from 'src/app/models/Line';
import { LineTypeService, LineHttpService } from 'src/app/services/lines/line.service';
import { GetAllStationsHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-change-line',
  templateUrl: './change-line.component.html',
  styleUrls: ['./change-line.component.css'],
  styles: ['agm-map {height: 450px; width: 550px;}']
})
export class ChangeLineComponent implements OnInit {


  public zoom: number;
  stations: Array<Station> = [];
  imageUrl: string = "./assets/busicon.png";
  stationsArray: Station[] = [];
  lineTypes: LineType[] = [];
  selectedLineType: LineType = null;
  lineName: string = "";
  lineNumber: number = null;
  line: Line = new Line();
  message: string;
  selectedLine: Line = null;
  lines: Array<Line> = [];

  constructor(private ngZone: NgZone, private httpLineType: LineTypeService, private httpStation: GetAllStationsHttpService, private router: Router, private httpLines: LineHttpService, private fb: FormBuilder){
  
  }

  ngOnInit() {
    this.httpStation.getAll().subscribe((data)=>{
      Object.assign(this.stations, data);
    });
    console.log(this.stations);

    this.httpLineType.getAll().subscribe((data)=>{
      Object.assign(this.lineTypes, data)
    });
    this.httpLines.getAll().subscribe((data)=>{
      Object.assign(this.lines, data);
    });
  }
  otkazi(){
    this.router.navigate(["admin", "linesGrid"]);
  }

  restartRoute(){
    this.stationsArray.splice(0);
  }

  addStation(station){
    this.stationsArray.push(station);
  }
  selectLine(){
    this.stationsArray = this.selectedLine.Stations;
    this.lineName = this.selectedLine.Name;
    this.lineNumber = this.selectedLine.Number;
  }

  changeLine(){
    this.httpLines.put(this.selectedLine.Id, this.selectedLine).subscribe((data)=>{
      if(data){
        this.message = "Uspesno izmenjena linija"
      }
      else{
        this.message = "Neuspesno izmenjena linija"
      }
    });
  }

}
