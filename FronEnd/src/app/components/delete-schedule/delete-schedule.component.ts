import { Component, OnInit } from '@angular/core';
import { ScheduleInfo } from 'src/app/models/ScheduleInfo';
import { ScheduleType } from 'src/app/models/ScheduleType';
import { LineType } from 'src/app/models/LineType';
import { Line } from 'src/app/models/Line';
import { Schedule } from 'src/app/models/Schedule';
import { Router } from '@angular/router';
import { ScheduleHttpService } from 'src/app/services/schedule/schedule.service';

@Component({
  selector: 'app-delete-schedule',
  templateUrl: './delete-schedule.component.html',
  styleUrls: ['./delete-schedule.component.css']
})
export class DeleteScheduleComponent implements OnInit {
  scheduleInfo:ScheduleInfo = new ScheduleInfo();
  selectedScheduleType: ScheduleType = null;
  selectedLineType: LineType = null;
  selectedLine: Line = null;
  filteredLines: Line[] = [];
  schedule: Schedule = new Schedule();
  departures: string;
  message: string
  constructor(private http: ScheduleHttpService, private router: Router) { }

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

  deleteSchedule(){
    //Odraditi brisanj reda voznje, pitati sretena kako bese da se to radi
  }

}
