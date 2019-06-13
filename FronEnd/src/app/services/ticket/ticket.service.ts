import { BaseHttpService } from '../http/base-http.service';
import { Injectable } from '@angular/core';
import { Ticket } from 'src/app/models/Ticket';

@Injectable()
export class TicketHttpService extends BaseHttpService<any>{
    specificUrl = "/api/Tickets/ValidateTicket"
}

@Injectable()
export class BuyTicketHttpService extends BaseHttpService<Ticket>{
    specificUrl = "/api/Tickets"
}