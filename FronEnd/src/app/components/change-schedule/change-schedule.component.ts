import { Component, OnInit } from '@angular/core';
import { ScheduleInfo } from 'src/app/models/ScheduleInfo';
import { ScheduleType } from 'src/app/models/ScheduleType';
import { LineType } from 'src/app/models/LineType';
import { Line } from 'src/app/models/Line';
import { Schedule } from 'src/app/models/Schedule';
import { ScheduleHttpService, ChangeScheduleHttpService } from 'src/app/services/schedule/schedule.service';
import { Router } from '@angular/router';
import { DepartureHttpService } from 'src/app/services/schedule/departure.service';

@Component({
  selector: 'app-change-schedule',
  templateUrl: './change-schedule.component.html',
  styleUrls: ['./change-schedule.component.css']
})
export class ChangeScheduleComponent implements OnInit {

  scheduleInfo:ScheduleInfo = new ScheduleInfo();
  selectedScheduleType: ScheduleType = null;
  selectedLineType: LineType = null;
  selectedLine: Line = null;
  filteredLines: Line[] = [];
  schedule: Schedule = new Schedule();
  departures: string;
  message: string
  changeApprov: boolean = true;

  constructor(private http: ScheduleHttpService, private router: Router, private httpChangeSchedule: ChangeScheduleHttpService, private httpDeparture: DepartureHttpService) { }

  ngOnInit() {
    this.http.getAll().subscribe((scheduleInfo) => {
      this.scheduleInfo = scheduleInfo; 
      console.log(scheduleInfo);
      err => console.log(err);
    });
  }

  changeselectedScheduleType(){
    console.log(this.selectedScheduleType);
    this.departures = "";
  }

  changeselectedLineType(){
    this.selectedLine = null;
    this.filteredLines.splice(0);
    this.scheduleInfo.Lines.forEach(element => {
      if(element.LineTypeId == this.selectedLineType.Id){
        this.filteredLines.push(element);
      }
    });
    this.departures = "";
  }

  changeLine(){
    this.departures = "";
  }

  redirectSchedule(){
    this.router.navigate(["admin", "schedule"]);
  }

  changeSchedule(){
    this.schedule.Departure = this.departures;
    this.httpChangeSchedule.put(this.schedule.Id, this.schedule).subscribe((data)=>{
      if(data){
        this.message = "Uspesno ste izmenili red voznje za datu liniju";
      }
      else{
        this.message = "Neuspensa izmena reda voznje"
      }
    });
  }
  getSchedule(){
    this.httpDeparture.get(this.selectedLine.Id, this.selectedScheduleType.Id).subscribe((schedule)=>{
      if(schedule != null){
        this.schedule = schedule;
        this.departures = schedule.Departure;
        this.message = ""
        this.changeApprov = false;
      }
      else{
        this.departures = "";
        this.message = "Za odabranu liniju ne postoji red voznje"
        this.changeApprov = true;
      }
      console.log(schedule);
      err => console.log(err);
    });
  }
}
