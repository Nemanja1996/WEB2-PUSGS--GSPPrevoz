import { Component, OnInit } from '@angular/core';
import { ScheduleInfo } from 'src/app/models/ScheduleInfo';
import { ScheduleType } from 'src/app/models/ScheduleType';
import { LineType } from 'src/app/models/LineType';
import { Line } from 'src/app/models/Line';
import { Schedule } from 'src/app/models/Schedule';
import { Router } from '@angular/router';
import { ScheduleHttpService, DeleteScheduleHttpService } from 'src/app/services/schedule/schedule.service';
import { DepartureHttpService } from 'src/app/services/schedule/departure.service';

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
  constructor(private http: ScheduleHttpService, private router: Router, private httpDeparture: DepartureHttpService, private httpDeleteSchedule: DeleteScheduleHttpService) { }


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

  changeseLine(){
    this.httpDeparture.get(this.selectedLine.Id, this.selectedScheduleType.Id).subscribe((schedule)=>{
      if(schedule != null){
        this.schedule = schedule;
        this.departures = this.schedule.Departure;
        this.message = "";
      }
      else{
        this.schedule.Departure = "";
        this.departures = this.schedule.Departure;
        this.message = "Za odabranu liniju ne postoji red voznje";
      }
      console.log(schedule);
      err => console.log(err);
    });
  }

  deleteSchedule(){
    this.httpDeleteSchedule.delete(this.schedule.Id).subscribe((data)=>{
      if(data){
        this.message = "Uspesno ste obrisali red voznje.";
        this.selectedLine = null;
        this.selectedLineType = null;
        this.selectedScheduleType = null;
        this.departures = "";
      }
      else{
        this.message = "Neuspesno brisanje reda voznje";
      }
    });
  }

}
