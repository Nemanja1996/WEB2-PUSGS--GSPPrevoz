using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class CatalogueHistoryRepository : Repository<CatalogueHistory, int>, ICatalogueHistoryRepository
    {
        public CatalogueHistoryRepository(DbContext context) : base(context)
        {

        }
        public new IEnumerable<CatalogueHistory> GetAll()
        {
            return context.Set<CatalogueHistory>().Include("TicketType").ToList();
        }
    }
}