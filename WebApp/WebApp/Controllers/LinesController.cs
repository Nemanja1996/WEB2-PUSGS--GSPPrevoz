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
    [Authorize]
    public class LinesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private IUnitOfWork db;
        public LinesController(IUnitOfWork db)
        {
            this.db = db;
        }
        // GET: api/Lines
        [AllowAnonymous]
        public IEnumerable<Line> GetLines()
        {
            return db.Lines.GetAll();
        }

        // GET: api/Lines/5
        [ResponseType(typeof(Line))]
        [AllowAnonymous]
        public IHttpActionResult GetLine(int id)
        {
            Line line = db.Lines.Get(id);
            if (line == null)
            {
                return NotFound();
            }

            return Ok(line);
        }

        //// PUT: api/Lines/5
        [ResponseType(typeof(bool))]
        public IHttpActionResult PutLine(int id, Line line)
        {
            if (!ModelState.IsValid)
            {
                return Ok(false);
            }

            if (id != line.Id)
            {
                return Ok(false);
            }
            List<Station> stationList = new List<Station>();
            foreach (var item in line.Stations)
            {
                stationList.Add(db.Stations.Get(item.Id));
            }

            Line tempLine = db.Lines.Get(line.Id);
            tempLine.Stations = stationList;
            db.Lines.Update(tempLine);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LineExists(id))
                {
                    return Ok(false);
                }
                else
                {
                    throw;
                }
            }

            return Ok(true);
        }

        // POST: api/Lines
        [ResponseType(typeof(bool))]
        public IHttpActionResult PostLine(Line line)
        {
            if (!ModelState.IsValid)
            {
                return Ok(false);
            }
            List<Station> stations = new List<Station>();
            foreach (var item in line.Stations)
            {
                stations.Add(db.Stations.Get(item.Id));
            }
            line.Stations = stations;
            db.Lines.Add(line);
            db.Complete();

            return Ok(true);
        }

        // DELETE: api/Lines/5
        [ResponseType(typeof(Line))]
        public IHttpActionResult DeleteLine(int id)
        {
            Line line = db.Lines.Get(id);
            if (line == null)
            {
                return NotFound();
            }

            db.Lines.Remove(line);
            db.Complete();

            return Ok(line);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LineExists(int id)
        {
            return db.Lines.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}