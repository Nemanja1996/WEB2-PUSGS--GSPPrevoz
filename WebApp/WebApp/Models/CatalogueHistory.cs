using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class CatalogueHistory
    {
        public int Id { get; set; }
        [Required]
        [Range(1, 15000)]
        public float TicketPrice { get; set; }
        
        [Required]
        public int CatalogueID { get; set; }
        public Catalogue Catalogue { get; set; }
        
        [Required]
        public int TicketTypeID { get; set; }
        public TicketType TicketType { get; set; }
        public List<Ticket> Tickets { get; set; }

    }
}