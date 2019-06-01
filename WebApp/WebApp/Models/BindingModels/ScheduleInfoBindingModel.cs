using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.BindingModels
{
    public class ScheduleInfoBindingModel
    {
        public List<LineType> LineTypes{get;set;}
        public List<Line> Lines{get;set;}
        public List<ScheduleType> ScheduleTypes{get;set;} 
    }
}