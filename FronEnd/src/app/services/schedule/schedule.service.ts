import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { ScheduleInfo } from 'src/app/models/ScheduleInfo';
import { Schedule } from 'src/app/models/Schedule';
import { injectArgs } from '@angular/core/src/di/injector_compatibility';
import { extend } from 'webdriver-js-extender';

@Injectable()
export class ScheduleHttpService extends BaseHttpService<ScheduleInfo>{
    specificUrl = "/api/Schedules/ScheduleInfo"
}

@Injectable()
export class AddScheduleHttpService extends BaseHttpService<Schedule>{
    specificUrl = "/api/Schedules"
}

@Injectable()
export class ChangeScheduleHttpService extends BaseHttpService<Schedule>{
    specificUrl = "/api/Schedules"
}

@Injectable()
export class DeleteScheduleHttpService extends BaseHttpService<any>{
    specificUrl = "/api/Schedules/"
}