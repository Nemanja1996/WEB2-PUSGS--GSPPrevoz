using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Models.BindingModels;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [Authorize]
    public class TicketsController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private IUnitOfWork db;

        public TicketsController(IUnitOfWork db)
        {
            this.db = db;
        }
        // GET: api/Tickets
        [AllowAnonymous]
        public IEnumerable<Ticket> GetTickets()
        {
            return db.Tickets.GetAll();
        }

        // GET: api/Tickets/5
        [AllowAnonymous]
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult GetTicket(int id)
        {
            Ticket ticket = db.Tickets.Get(id);
            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        // PUT: api/Tickets/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTicket(int id, Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ticket.Id)
            {
                return BadRequest();
            }

            db.Tickets.Update(ticket);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tickets
        [ResponseType(typeof(bool))]
        public IHttpActionResult PostTicket(Ticket ticket)
        {

            ApplicationUser appUser =  HttpContext.Current.GetOwinContext()
                                    .GetUserManager<ApplicationUserManager>()
                                    .FindById(User.Identity.GetUserId());

            if (appUser.Approved == true)
            {
                Catalogue catalogue = db.Catalogues.Find(x => x.ValidTo == null || x.ValidTo > DateTime.Now).FirstOrDefault();
                CatalogueHistory cataloguesHistories = db.CatalogueHistory.Find(x => x.CatalogueID == catalogue.Id && x.TicketTypeID == ticket.TicketTypeID).FirstOrDefault();

                ticket.ApplicationUserID = appUser.Id;
                ticket.IsValid = true;
                ticket.TimeIssued = DateTime.Now;
                ticket.CatalogueHistoryID = cataloguesHistories.Id;
                db.Tickets.Add(ticket);
            }
            else
            {
                BadRequest();
            }

            Request.GetOwinContext().GetUserManager<ApplicationUserManager>().Update(appUser);
            db.Complete();

            return Ok(true);
        }

        // DELETE: api/Tickets/5
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult DeleteTicket(int id)
        {
            Ticket ticket = db.Tickets.Get(id);
            if (ticket == null)
            {
                return NotFound();
            }

            db.Tickets.Remove(ticket);
            db.Complete();

            return Ok(ticket);
        }

        [ResponseType(typeof(bool))]
        [Route("api/Tickets/ValidateTicket/{id}")]
        public IHttpActionResult PutValidateTicket(int id)
        {
            Ticket ticket = db.Tickets.Get(id);

            if (ticket != null)
            {
                if (ticket.TicketTypeID == 1)
                {
                    if (ticket.TimeIssued.AddHours(1) < DateTime.Now)
                    {
                        ticket.IsValid = false;
                        db.Complete();
                        return Ok(false);
                    }
                    else
                    {
                        return Ok(true);
                    }
                }
                else if (ticket.TicketTypeID == 2)
                {
                    if (ticket.TimeIssued.AddDays(1) < DateTime.Now)
                    {
                        ticket.IsValid = false;
                        db.Complete();
                        return Ok(false);
                    }
                    else
                    {
                        return Ok(true);
                    }

                }
                else if (ticket.TicketTypeID == 3)
                {
                    if (ticket.TimeIssued.AddMonths(1) < DateTime.Now)
                    {
                        ticket.IsValid = false;
                        db.Complete();
                        return Ok(false);
                    }
                    else
                    {
                        return Ok(true);
                    }
                }
                else if (ticket.TicketTypeID == 4)
                {
                    if (ticket.TimeIssued.AddYears(1) < DateTime.Now)
                    {
                        ticket.IsValid = false;
                        db.Complete();
                        return Ok(false);
                    }
                    else
                    {
                        return Ok(true);
                    }
                }
                else
                {
                    return Ok(false);
                }
            }
            else
            {
                return Ok(false);
            }
        }

        [ResponseType(typeof(bool))]
        [Route("api/Tickets/BuyTimeTicket")]
        [AllowAnonymous]
        public IHttpActionResult PostTimeTicket(Email email)
        {
            Ticket ticket = new Ticket();
            TicketType timeTicket = db.TicketTypes.Find(x => x.Name == "Vremenska").FirstOrDefault();
            ticket.IsValid = true;
            ticket.TimeIssued = DateTime.Now;
            ticket.TicketTypeID = timeTicket.Id;

            Catalogue catalogue = db.Catalogues.Find(x => x.ValidTo == null || x.ValidTo > DateTime.Now).FirstOrDefault();
            CatalogueHistory catalogueHistory = db.CatalogueHistory.Find(x => x.TicketTypeID == ticket.TicketTypeID && x.CatalogueID == catalogue.Id).FirstOrDefault();
            ticket.CatalogueHistoryID = catalogueHistory.Id; 
            db.Tickets.Add(ticket);
            db.Complete();

            DateTime validTo = ticket.TimeIssued.AddHours(1);

            try
            {
                SendEmail(email.Value, "GSP Service, kupovina karte.", $"Postovani, Vasa karta traje sat vremena i istice {validTo}.\n  Hvala na koriscenju usluga");

                return Ok(true);

            }
            catch (Exception)
            {
                return Ok(false);
            }
        }

        private void SendEmail(string recipient, string subject, string body)
        {
            MailMessage mail = new MailMessage();
            SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");

            try
            {
                mail.To.Add(recipient);
            }
            catch(Exception e) { }

            mail.Subject = subject;
            mail.Body = body;
            mail.From = new MailAddress("titovrentavehicle@gmail.com");
            smtpServer.Port = 587;
            smtpServer.Credentials = new NetworkCredential("titovrentavehicle@gmail.com", "drugtito");
            smtpServer.EnableSsl = true;

            smtpServer.Send(mail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TicketExists(int id)
        {
            return db.Tickets.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}