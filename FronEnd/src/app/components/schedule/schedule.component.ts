import { Component, OnInit } from '@angular/core';
import { ScheduleHttpService } from 'src/app/services/schedule/schedule.service';
import { ScheduleInfo } from 'src/app/models/ScheduleInfo';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  scheduleInfo:ScheduleInfo
  constructor(private http: ScheduleHttpService) { }

  ngOnInit() {
    this.http.getAll().subscribe((scheduleInfo) => {this.scheduleInfo = scheduleInfo; console.log(scheduleInfo)}, err => console.log(err));
  }
}
