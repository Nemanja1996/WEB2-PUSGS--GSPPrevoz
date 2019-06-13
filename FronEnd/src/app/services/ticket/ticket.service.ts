import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TicketHttpService extends BaseHttpService<any>{
    specificUrl = "/api/Tickets/ValidateTicket"
}