import { BaseHttpService } from '../http/base-http.service';
import { TicketType } from 'src/app/models/TicketType';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketTypeHttp extends BaseHttpService<TicketType[]>{
    specificUrl = "/api/TicketTypes"
}