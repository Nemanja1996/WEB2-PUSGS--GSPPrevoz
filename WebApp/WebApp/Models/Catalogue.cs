using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Catalogue
    {
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "datetime2")]
        public DateTime ValidFrom { get; set; }
        [Column(TypeName = "datetime2")]
        public DateTime ?ValidTo { get; set; }

        public List<CatalogueHistory> CatalogueHistories { get; set; }
    }
}