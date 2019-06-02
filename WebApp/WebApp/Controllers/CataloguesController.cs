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
    public class CataloguesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private IUnitOfWork db;

        public CataloguesController(IUnitOfWork db)
        {
            this.db = db;
        }
        // GET: api/Catalogues
        public IEnumerable<Catalogue> GetCatalogue()
        {
            return db.Catalogues.GetAll();
        }

        // GET: api/Catalogues/5
        [ResponseType(typeof(Catalogue))]
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
        [ResponseType(typeof(Catalogue))]
        public IHttpActionResult PostCatalogue(Catalogue catalogue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Catalogues.Add(catalogue);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = catalogue.Id }, catalogue);
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
        public IHttpActionResult GetCatalogueInfo()
        {
            List<TicketType> ticketTypes = db.TicketTypes.GetAll().ToList();
            List<PassengerType> passengertypes = db.PassengerTypes.GetAll().ToList();
            CatalogueInfoBindingModel c = new CatalogueInfoBindingModel() { TicketTypes = ticketTypes, PassengerTypes = passengertypes};

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