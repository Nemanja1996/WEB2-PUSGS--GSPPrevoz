import { Component, OnInit } from '@angular/core';
import { ScheduleHttpService } from 'src/app/services/schedule/schedule.service';
import { ScheduleInfo } from 'src/app/models/ScheduleInfo';
import { LineType } from 'src/app/models/LineType';
import { ScheduleType } from 'src/app/models/ScheduleType';
import { Line } from 'src/app/models/Line';
import { DepartureHttpService } from 'src/app/services/schedule/departure.service';
import { Schedule } from 'src/app/models/Schedule';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  scheduleInfo:ScheduleInfo = new ScheduleInfo();
  selectedScheduleType: ScheduleType = null;
  selectedLineType: LineType = null;
  selectedLine: Line = null;;
  filteredLines: Line[] = [];
  schedule: Schedule = new Schedule();

  constructor(private http: ScheduleHttpService, private httpDeparture: DepartureHttpService) { }

  ngOnInit() {
    this.http.getAll().subscribe((scheduleInfo) => {
        this.scheduleInfo = scheduleInfo;
      console.log(scheduleInfo);
      err => console.log(err);
    });
  }

  changeselectedScheduleType(){
    console.log(this.selectedScheduleType);
  }

  changeselectedLineType(){
    this.selectedLine = null;
    this.filteredLines.splice(0);
    this.scheduleInfo.Lines.forEach(element => {
      if(element.LineTypeId == this.selectedLineType.Id){
        this.filteredLines.push(element);
      }
    });
  }

  getSchedule(){
    this.httpDeparture.get(this.selectedLine.Id, this.selectedScheduleType.Id).subscribe((schedule)=>{
      if(schedule != null){
        this.schedule = schedule;
      }
      else{
        this.schedule.Departure = "";
      }
      console.log(schedule);
      err => console.log(err);
    });
  }
}