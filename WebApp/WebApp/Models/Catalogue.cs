﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Catalogue
    {
        public int Id { get; set; }
        [Required]
        [StringLength(20)]
        public string ValidFrom { get; set; }
        [Required]
        [StringLength(20)]
        public string ValidTo { get; set; }

        public List<CatalogueHistory> CatalogueHistories { get; set; }
    }
}