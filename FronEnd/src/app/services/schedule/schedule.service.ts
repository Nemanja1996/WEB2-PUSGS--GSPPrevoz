import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { ScheduleInfo } from 'src/app/models/ScheduleInfo';

@Injectable()
export class ScheduleHttpService extends BaseHttpService<ScheduleInfo>{
    specificUrl = "/api/Schedules/ScheduleInfo"
}