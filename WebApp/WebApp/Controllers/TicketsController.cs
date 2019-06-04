using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Models.BindingModels;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class TicketsController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private IUnitOfWork db;

        public TicketsController(IUnitOfWork db)
        {
            this.db = db;
        }
        // GET: api/Tickets
        public IEnumerable<Ticket> GetTickets()
        {
            return db.Tickets.GetAll();
        }

        // GET: api/Tickets/5
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
        [ResponseType(typeof(Ticket))]
        public IHttpActionResult PostTicket(Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Tickets.Add(ticket);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = ticket.Id }, ticket);
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
        [ResponseType(typeof(void))]
        [Route("api/Tickets/BuyTimeTicket")]
        public IHttpActionResult PostTimeTicket(Email email)
        {
            Ticket ticket = new Ticket();
            TicketType timeTicket = db.TicketTypes.Find(x => x.Name == "Vremenska").FirstOrDefault();
            ticket.IsValid = true;
            ticket.TimeIssued = DateTime.Now;
            ticket.CatalogueHistoryID = timeTicket.Id;
            db.Tickets.Add(ticket);
            db.Complete();

            SendEmail("GSP Service", "prevoz@gsp.com", email.Value, "GSP Service, kupovina karte.", "Postovani, Vasa karta traje sat vremena i istice  " + DateTime.Now.ToString() + "  Hvala na koriscenju usluga");

            return Ok();
        }

        private void SendEmail(string sendername, string sender, string recipient, string subject, string body)
        {
            // SMTP server,port,username,password should be obtained from C:\cornerstone\CFMLocal.txt (line 2?)
            SmtpClient smtpClient = new SmtpClient("smtp.mailtrap.io", 2525)
            {
                // Milan's mail trap free SMTP credentials : u: "3af75f9040edca", p: "bc2ed058a47d71"  | host: "smtp.mailtrap.io", 2525
                Credentials = new System.Net.NetworkCredential()
                {
                    UserName = "3af75f9040edca",
                    Password = "bc2ed058a47d71"
                },

                EnableSsl = true
            };

            MailAddress from = new MailAddress(sender, sendername);
            MailAddress to = new MailAddress(recipient, "");
            MailMessage mailMessage = new MailMessage(from, to)
            {
                Subject = subject,
                Body = body
            };



            smtpClient.Send(mailMessage);
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