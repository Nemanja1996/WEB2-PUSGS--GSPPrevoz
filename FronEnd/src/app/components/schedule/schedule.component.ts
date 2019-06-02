import { Component, OnInit } from '@angular/core';
import { ScheduleHttpService } from 'src/app/services/schedule/schedule.service';
import { ScheduleInfo } from 'src/app/models/ScheduleInfo';
import { LineType } from 'src/app/models/LineType';
import { ScheduleType } from 'src/app/models/ScheduleType';
import { Line } from 'src/app/models/Line';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  scheduleInfo:ScheduleInfo = new ScheduleInfo();
  selectedScheduleType: ScheduleType = new ScheduleType();
  selectedLineType: LineType = new LineType();
  selectedLine: Line = new Line();
  filteredLines: Line[] = [];

  constructor(private http: ScheduleHttpService) { }

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
    this.filteredLines.splice(0);
    this.scheduleInfo.Lines.forEach(element => {
      if(element.LineTypeId == this.selectedLineType.Id){
        this.filteredLines.push(element);
      }
    });
  }

  getSchedule(){
    //Ovde odraditi dobavljanje reda voznje sa servera, napraviti novu metodu u kotroleru...
  }
}