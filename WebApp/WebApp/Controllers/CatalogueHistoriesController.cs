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
using WebApp.Persistence;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    public class CatalogueHistoriesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private IUnitOfWork db;

        public CatalogueHistoriesController(IUnitOfWork db)
        {
            this.db = db;
        }
        // GET: api/CatalogueHistories
        public IEnumerable<CatalogueHistory> GetCatalogueHistory()
        {
            return db.CatalogueHistory.GetAll();
        }

        // GET: api/CatalogueHistories/5
        [ResponseType(typeof(CatalogueHistory))]
        public IHttpActionResult GetCatalogueHistory(int id)
        {
            CatalogueHistory catalogueHistory = db.CatalogueHistory.Get(id);
            if (catalogueHistory == null)
            {
                return NotFound();
            }

            return Ok(catalogueHistory);
        }

        // PUT: api/CatalogueHistories/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCatalogueHistory(int id, CatalogueHistory catalogueHistory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != catalogueHistory.Id)
            {
                return BadRequest();
            }

            db.CatalogueHistory.Update(catalogueHistory);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CatalogueHistoryExists(id))
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

        // POST: api/CatalogueHistories
        [ResponseType(typeof(CatalogueHistory))]
        public IHttpActionResult PostCatalogueHistory(CatalogueHistory catalogueHistory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.CatalogueHistory.Add(catalogueHistory);
            db.Complete();

            return CreatedAtRoute("DefaultApi", new { id = catalogueHistory.Id }, catalogueHistory);
        }

        // DELETE: api/CatalogueHistories/5
        [ResponseType(typeof(CatalogueHistory))]
        public IHttpActionResult DeleteCatalogueHistory(int id)
        {
            CatalogueHistory catalogueHistory = db.CatalogueHistory.Get(id);
            if (catalogueHistory == null)
            {
                return NotFound();
            }

            db.CatalogueHistory.Remove(catalogueHistory);
            db.Complete();

            return Ok(catalogueHistory);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CatalogueHistoryExists(int id)
        {
            return db.CatalogueHistory.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}