import { Component, OnInit } from '@angular/core';
import { TicketTypeHttp } from 'src/app/services/ticketType/ticket.type.service';
import { TicketType } from 'src/app/models/TicketType';
import { BuyTicketHttpService } from 'src/app/services/ticket/ticket.service';
import { Ticket } from 'src/app/models/Ticket';

@Component({
  selector: 'app-ticket-review',
  templateUrl: './ticket-review.component.html',
  styleUrls: ['./ticket-review.component.css']
})
export class TicketReviewComponent implements OnInit {
  ticketTypes: TicketType[] = null;
  selectedTicketType: TicketType = null;
  ticket: Ticket = new Ticket()
  message: string = "";

  constructor(private httpTicketType: TicketTypeHttp, private httpBuyTicket: BuyTicketHttpService) { }

  ngOnInit() {
    this.httpTicketType.getAll().subscribe((data)=>{
      this.ticketTypes = data;
    });
  }

  buyTicket(){
    this.ticket.TicketTypeID = this.selectedTicketType.Id;
    this.httpBuyTicket.post(this.ticket).subscribe((data)=>{
      if(data){
        this.message = "Uspesno ste kupili kartu"
      }
      else{
        this.message = "Neuspesna kupovina karte"
      }
    });
  }
}
