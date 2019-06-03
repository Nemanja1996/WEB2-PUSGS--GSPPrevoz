import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { Schedule } from 'src/app/models/Schedule';

@Injectable()
export class DepartureHttpService extends BaseHttpService<Schedule>{
    specificUrl = "/api/Schedules/ScheduleLine"
}