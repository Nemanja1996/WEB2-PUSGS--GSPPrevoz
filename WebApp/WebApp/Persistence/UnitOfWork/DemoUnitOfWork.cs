using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Unity;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public class DemoUnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
      
        public DemoUnitOfWork(DbContext context)
        {
            _context = context;
        }

        [Dependency]
        public IPassengerTypesRepository PassengerTypes { get; set; }
        [Dependency]
        public ITicketTypesRepository TicketTypes { get; set; }
        [Dependency]
        public IVehicleTypeRepository VehicleTypes { get; set; }
        [Dependency]
        public ICatalogueRepository Catalogues { get; set; }
        [Dependency]
        public ICatalogueHistoryRepository CatalogueHistory { get; set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}