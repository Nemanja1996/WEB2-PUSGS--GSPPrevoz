using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Models.BindingModels;
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [Authorize]
    public class CataloguesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private IUnitOfWork db;

        public CataloguesController(IUnitOfWork db)
        {
            this.db = db;
        }
        // GET: api/Catalogues
        [AllowAnonymous]
        public IEnumerable<Catalogue> GetCatalogue()
        {
            return db.Catalogues.GetAll();
        }

        // GET: api/Catalogues/5
        [ResponseType(typeof(Catalogue))]
        [AllowAnonymous]
        public IHttpActionResult GetCatalogue(int id)
        {
            Catalogue catalogue = db.Catalogues.Get(id);
            if (catalogue == null)
            {
                return NotFound();
            }

            return Ok(catalogue);
        }

        // PUT: api/Catalogues/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCatalogue(int id, Catalogue catalogue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != catalogue.Id)
            {
                return BadRequest();
            }

            db.Catalogues.Update(catalogue);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CatalogueExists(id))
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

        // POST: api/Catalogues
        [ResponseType(typeof(bool))]
        public IHttpActionResult PostCatalogue(Catalogue catalogue)
        {
            if (!ModelState.IsValid)
            {
                return Ok(false);
            }
            Catalogue catalogue1 = db.Catalogues.Find(x => x.ValidTo == null).FirstOrDefault();
            catalogue1.ValidTo = catalogue.ValidFrom;
            db.Catalogues.Add(catalogue);
            db.Complete();

            return Ok(true);
        }

        [ResponseType(typeof(bool))]
        [Route("api/Catalogues/CatalogueAndCatalogueHistory")]
        public IHttpActionResult PostCatalogueAndCatalogueHistory(CatalogueBindingModel catalogueInfo)
        {
            if (!ModelState.IsValid)
            {
                return Ok(false);
            }
            Catalogue catalogue1 = db.Catalogues.Find(x => x.ValidTo == null).FirstOrDefault();
            catalogue1.ValidTo = catalogueInfo.Catalogue.ValidFrom;

            db.Catalogues.Add(catalogueInfo.Catalogue);
            db.Complete();

            catalogue1 = db.Catalogues.Find(x => x.ValidTo == null).FirstOrDefault();

            CatalogueHistory catalogue;
            foreach (var item in catalogueInfo.CatalogueHistories)
            {
                catalogue = new CatalogueHistory() { TicketPrice = item.TicketPrice, CatalogueID = catalogue1.Id, TicketTypeID = item.TicketTypeID };
                db.CatalogueHistory.Add(catalogue);
            }
            db.Complete();

            return Ok(true);
        }

        // DELETE: api/Catalogues/5
        [ResponseType(typeof(Catalogue))]
        public IHttpActionResult DeleteCatalogue(int id)
        {
            Catalogue catalogue = db.Catalogues.Get(id);
            if (catalogue == null)
            {
                return NotFound();
            }

            db.Catalogues.Remove(catalogue);
            db.Complete();

            return Ok(catalogue);
        }

        [ResponseType(typeof(CatalogueInfoBindingModel))]
        [Route("api/Catalogues/CatalogueInfo")]
        [AllowAnonymous]
        public IHttpActionResult GetCatalogueInfo()
        {
            List<TicketType> ticketTypes = db.TicketTypes.GetAll().ToList();
            List<PassengerType> passengertypes = db.PassengerTypes.GetAll().ToList();
            Catalogue catalogue = db.Catalogues.Find(x => x.ValidTo == null || x.ValidTo > DateTime.Now).FirstOrDefault();
            List<CatalogueHistory> cataloguesHistories = db.CatalogueHistory.Find(x => x.CatalogueID == catalogue.Id).ToList();

            List<TicketPrice> ticketPrices = new List<TicketPrice>(4);
            foreach (var item in cataloguesHistories)
            {
                foreach (var item1 in passengertypes)
                {
                    ticketPrices.Add(new TicketPrice() { OriginalPrice = item.TicketPrice, DiscountPrice = item.TicketPrice - item.TicketPrice * (item1.Discount / 100), PassType = item1.Name});
                }
            }

            CatalogueInfoBindingModel c = new CatalogueInfoBindingModel() { TicketTypes = ticketTypes, PassengerTypes = passengertypes, TicketPrices = ticketPrices};

            return Ok(c);
        }

        [ResponseType(typeof(CatalogueInfoBindingModel))]
        [Route("api/Catalogues/CatalogueInfo/{id}")]
        [AllowAnonymous]
        public IHttpActionResult GetCatalogueInfo(int id)
        {
            List<TicketType> ticketTypes = db.TicketTypes.GetAll().ToList();
            List<PassengerType> passengertypes = db.PassengerTypes.GetAll().ToList();
            Catalogue catalogue = db.Catalogues.Get(id);
            List<CatalogueHistory> cataloguesHistories = db.CatalogueHistory.Find(x => x.CatalogueID == catalogue.Id).ToList();

            List<TicketPrice> ticketPrices = new List<TicketPrice>(4);
            foreach (var item in cataloguesHistories)
            {
                foreach (var item1 in passengertypes)
                {
                    ticketPrices.Add(new TicketPrice() { OriginalPrice = item.TicketPrice, DiscountPrice = item.TicketPrice - item.TicketPrice * (item1.Discount / 100), PassType = item1.Name });
                }
            }

            CatalogueInfoBindingModel c = new CatalogueInfoBindingModel() { TicketTypes = ticketTypes, PassengerTypes = passengertypes, TicketPrices = ticketPrices };

            return Ok(c);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CatalogueExists(int id)
        {
            return db.Catalogues.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}