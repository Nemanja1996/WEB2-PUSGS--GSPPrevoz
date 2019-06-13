import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { TicketHttpService } from 'src/app/services/ticket/ticket.service';

@Component({
  selector: 'app-validate-ticket',
  templateUrl: './validate-ticket.component.html',
  styleUrls: ['./validate-ticket.component.css']
})
export class ValidateTicketComponent implements OnInit {

  ticketId:number
  message:string = ""

  validateForm = this.fb.group({
    ticketId: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private httpTicket: TicketHttpService) { }

  ngOnInit() {
  }

  validateTicket(){
    this.httpTicket.put(this.validateForm.value.ticketId).subscribe((data)=>{
      if(data){
        this.message = "Unesena karta je vazeca"
      }
      else{
        this.message = "Karta nije vazeca ili ne postoji"
      }
    });
  }
}
