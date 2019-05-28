using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class ScheduleTypesRepository : Repository<ScheduleType, int>, IScheduleTypeRepository
    {
        public ScheduleTypesRepository(DbContext context) : base(context)
        {
        }
    }
}