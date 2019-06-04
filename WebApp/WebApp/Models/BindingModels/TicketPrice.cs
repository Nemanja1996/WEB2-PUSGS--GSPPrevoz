using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.BindingModels
{
    public class TicketPrice
    {
        public float OriginalPrice { get; set; }
        public float DiscountPrice { get; set; }
        public string PassType { get; set; }
    }
}