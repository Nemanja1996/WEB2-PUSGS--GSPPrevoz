import { Catalogue } from './Catalogue';
import { TicketType } from './TicketType';
import { Ticket } from './Ticket';

export class CatalogueHistory{
    Id: number;
    TicketPrice: number;
    CatalogueID:number;
    TicketTypeID:number;
    Catalogue: Catalogue;
    TicketType: TicketType;
    Tickets: Ticket[];
}