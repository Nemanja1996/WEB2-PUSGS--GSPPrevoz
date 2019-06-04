using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models.BindingModels
{
    public class CatalogueInfoBindingModel
    {
        public List<TicketType> TicketTypes { get; set; }
        public List<PassengerType> PassengerTypes { get; set; }
        public List<TicketPrice> TicketPrices { get; set; }
    }
}