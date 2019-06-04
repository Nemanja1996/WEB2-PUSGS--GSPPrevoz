import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TimeTicketHttpService } from 'src/app/services/ticket/timeTicket.service';
import { Ticket } from 'src/app/models/Ticket';
import { Email } from 'src/app/models/Email';

@Component({
  selector: 'app-buy-ticket',
  templateUrl: './buy-ticket.component.html',
  styleUrls: ['./buy-ticket.component.css']
})
export class BuyTicketComponent implements OnInit {
  email:Email = new Email;
  message:string = ""

  buyForm = this.fb.group({
    email: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private ticketService: TimeTicketHttpService) { }

  ngOnInit() {
  }

  buyTicket(){
    this.email.Value = this.buyForm.value.email;
    this.ticketService.post(this.email).subscribe();
    this.buyForm.reset();
    this.message = "Hvala sto ste kupili kartu, sve informacije poslate su na mail."
  }

}
