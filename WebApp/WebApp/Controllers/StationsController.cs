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
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [Authorize]
    public class StationsController : ApiController
    {
        //private WebAppContext db = new WebAppContext();
        private IUnitOfWork db;

        public StationsController(IUnitOfWork db)
        {
            this.db = db;
        }

        // GET: api/Stations
        [AllowAnonymous]
        public IEnumerable<Station> GetStations()
        {
            return db.Stations.GetAll();
        }

        // GET: api/Stations/5
        [AllowAnonymous]
        [ResponseType(typeof(Station))]
        public IHttpActionResult GetStation(int id)
        {
            Station station = db.Stations.Get(id);
            if (station == null)
            {
                return NotFound();
            }

            return Ok(station);
        }

        // PUT: api/Stations/5
        [ResponseType(typeof(bool))]
        public IHttpActionResult PutStation(int id, Station station)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != station.Id)
            {
                return Ok(false);
            }

            db.Stations.Update(station);
            int result;
                result = db.Complete();
            if (result != -1)
            {
                return Ok(true);

            }
            else
            {
                return BadRequest("Podaci za ovu stanicu su upravo izmenjeni, pokusajte kasnije");
            }

        }

        // POST: api/Stations
        [ResponseType(typeof(bool))]
        public IHttpActionResult PostStation(Station station)
        {
            if (!ModelState.IsValid)
            {
                return Ok(false);
            }

            db.Stations.Add(station);
            db.Complete();

            return Ok(true);
        }

        // DELETE: api/Stations/5
        [ResponseType(typeof(bool))]
        public IHttpActionResult DeleteStation(int id)
        {
            Station station = db.Stations.Get(id);
            if (station == null)
            {
                return Ok(false);
            }

            db.Stations.Remove(station);
            db.Complete();

            return Ok(true);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StationExists(int id)
        {
            return db.Stations.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}