import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/Station';
import { Line } from 'src/app/models/Line';
import { GetAllStationsHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';
import { LineHttpService, LineTypeService } from 'src/app/services/lines/line.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LineType } from 'src/app/models/LineType';

@Component({
  selector: 'app-add-line',
  templateUrl: './add-line.component.html',
  styleUrls: ['./add-line.component.css'],
  styles: ['agm-map {height: 450px; width: 650px;}']
})
export class AddLineComponent implements OnInit {

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

  addLine(){
    this.line.Name = this.lineName;
    this.line.Number = this.lineNumber;
    this.line.Stations = this.stationsArray;
    this.line.LineTypeId = this.selectedLineType.Id;
    console.log(this.line)
    this.httpLines.post(this.line).subscribe((data)=>{
      if(data){
        this.message = "Uspesno dodata linija"
      }
      else{
        this.message = "Neuspesno dodata linija"
      }
    });
  }
}
