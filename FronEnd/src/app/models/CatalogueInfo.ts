import { TicketType } from './TicketType';
import { PassengerType } from './PassengerType';
import { TicketPrice } from './TicketPrice';

export class CatalogueInfo{
    TicketTypes: TicketType[] = []
    PassengerTypes: PassengerType[] = []
    TicketPrices: TicketPrice[] = []
}