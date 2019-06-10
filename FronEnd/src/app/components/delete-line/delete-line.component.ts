import { Component, OnInit, NgZone } from '@angular/core';
import { Station } from 'src/app/models/Station';
import { Line } from 'src/app/models/Line';
import { GetAllStationsHttpService } from 'src/app/services/station/station.service';
import { Router } from '@angular/router';
import { LineHttpService } from 'src/app/services/lines/line.service';

@Component({
  selector: 'app-delete-line',
  templateUrl: './delete-line.component.html',
  styleUrls: ['./delete-line.component.css'],
  styles: ['agm-map {height: 450px; width: 550px;}']
})
export class DeleteLineComponent implements OnInit {
  public zoom: number;
  stations: Array<Station> = [];
  imageUrl: string = "./assets/busicon.png";
  lines: Array<Line> = [];
  stationsArray: Station[] = [];
  selectedLine: Line = null;
  message: string;

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

  selectionChanged() {
    this.stationsArray = this.selectedLine.Stations;
    console.log(this.stationsArray);
  }

  // showLine(){
  //   this.stationsArray = this.selectedLine.Stations;
  //   console.log(this.stationsArray);
  // }

  deleteLine() {
    this.httpLines.delete(this.selectedLine.Id).subscribe((data) => {
      if (data) {
        this.message = "Uspesno ste obrisali selektovanu liniju.";
        this.selectedLine = null;
      }
      else {
        this.message = "Greska prilikom brisanja zadate linije.";
      }
    });
  }

}
