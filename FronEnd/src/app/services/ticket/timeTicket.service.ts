import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { Email } from 'src/app/models/Email';

@Injectable()
export class TimeTicketHttpService extends BaseHttpService<Email>{
    specificUrl = "/api/Tickets/BuyTimeTicket"
}