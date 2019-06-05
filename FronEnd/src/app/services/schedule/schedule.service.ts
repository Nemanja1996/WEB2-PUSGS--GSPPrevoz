import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { ScheduleInfo } from 'src/app/models/ScheduleInfo';
import { Schedule } from 'src/app/models/Schedule';

@Injectable()
export class ScheduleHttpService extends BaseHttpService<ScheduleInfo>{
    specificUrl = "/api/Schedules/ScheduleInfo"
}

@Injectable()
export class AddScheduleHttpService extends BaseHttpService<Schedule>{
    specificUrl = "/api/Schedules"
}