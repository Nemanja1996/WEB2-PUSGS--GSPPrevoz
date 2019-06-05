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
    public class SchedulesController : ApiController
    {
        //private ApplicationDbContext db = new ApplicationDbContext();
        private IUnitOfWork db;

        public SchedulesController(IUnitOfWork db)
        {
            this.db = db;
        }
        // GET: api/Schedules
        public IEnumerable<Schedule> GetSchedules()
        {
            return db.Schedules.GetAll();
        }

        // GET: api/Schedules/5
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult GetSchedule(int id)
        {
            Schedule schedule = db.Schedules.Get(id);
            if (schedule == null)
            {
                return NotFound();
            }

            return Ok(schedule);
        }

        // PUT: api/Schedules/5
        [ResponseType(typeof(bool))]
        public IHttpActionResult PutSchedule(int id, Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != schedule.Id)
            {
                return Ok(false);
            }

            db.Schedules.Update(schedule);

            try
            {
                db.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(id))
                {
                    return Ok(false);
                }
                else
                {
                    return Ok(false);
                }
            }

            return Ok(true);
        }

        // POST: api/Schedules
        [ResponseType(typeof(bool))]
        public IHttpActionResult PostSchedule(Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Schedule sch = db.Schedules.Find(x => x.LineId == schedule.LineId && x.ScheduleTypeId == schedule.ScheduleTypeId).FirstOrDefault();
            if (sch == null) {
                db.Schedules.Add(schedule);
                db.Complete();
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        // DELETE: api/Schedules/5
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult DeleteSchedule(int id)
        {
            Schedule schedule = db.Schedules.Get(id);
            if (schedule == null)
            {
                return NotFound();
            }

            db.Schedules.Remove(schedule);
            db.Complete();

            return Ok(schedule);
        }
        [ResponseType(typeof(ScheduleInfoBindingModel))]
        [Route("api/Schedules/ScheduleInfo")]
        public IHttpActionResult GetScheduleInfo()
        {
            List<LineType> lineTtypes = db.LineTypes.GetAll().ToList();
            List<Line> lines = db.Lines.GetAll().ToList();
            List<ScheduleType> scheduleTypes = db.ScheduleTypes.GetAll().ToList();
            ScheduleInfoBindingModel s = new ScheduleInfoBindingModel() { Lines = lines, ScheduleTypes = scheduleTypes, LineTypes = lineTtypes};

            return Ok(s);
        }

        [ResponseType(typeof(Schedule))]
        [Route("api/Schedules/ScheduleLine/{lineId}/{scheduleTypeId}")]
        public IHttpActionResult GetScheduleLine(int lineId, int scheduleTypeId)
        {
            Schedule s = db.Schedules.Find(x => x.LineId == lineId && x.ScheduleTypeId == scheduleTypeId).FirstOrDefault();
            return Ok(s);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ScheduleExists(int id)
        {
            return db.Schedules.GetAll().Count(e => e.Id == id) > 0;
        }
    }
}