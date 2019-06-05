import { Component, OnInit } from '@angular/core';
import { ScheduleHttpService, AddScheduleHttpService } from 'src/app/services/schedule/schedule.service';
import { Router } from '@angular/router';
import { ScheduleInfo } from 'src/app/models/ScheduleInfo';
import { ScheduleType } from 'src/app/models/ScheduleType';
import { LineType } from 'src/app/models/LineType';
import { Line } from 'src/app/models/Line';
import { Schedule } from 'src/app/models/Schedule';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {
  scheduleInfo:ScheduleInfo = new ScheduleInfo();
  selectedScheduleType: ScheduleType = null;
  selectedLineType: LineType = null;
  selectedLine: Line = null;
  filteredLines: Line[] = [];
  schedule: Schedule = new Schedule();
  departures: string;
  message: string

  constructor(private http: ScheduleHttpService, private httpAddSchedule: AddScheduleHttpService, private router: Router) { }

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
  redirectSchedule(){
    this.router.navigate(["admin", "schedule"]);
  }

  addSchedule(){
    this.schedule.Departure = this.departures;
    this.schedule.LineId = this.selectedLine.Id;
    this.schedule.ScheduleTypeId = this.selectedScheduleType.Id;
    this.httpAddSchedule.post(this.schedule).subscribe((data) =>{
      if(data){
        this.router.navigate(["admin", "schedule"]);
      }
      else{
        this.message = "Za odabranu liniju vec postoji red voznje"
      }
    });
    this.departures = "";
  }
}
