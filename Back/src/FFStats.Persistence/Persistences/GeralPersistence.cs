using System;
using System.Linq;
using System.Threading.Tasks;
using FFStats.Domain.Models;
using FFStats.Persistence.Contextos;
using FFStats.Persistence.Contratos;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Persistences
{
    public class GeralPersistence : IGeralPersistence
    {
        private readonly FFStatsContext _context;
        public GeralPersistence(FFStatsContext context)
        {
            this._context = context;
        }
        //Geral
        public void Add<T>(T Entity) where T : class
        {
            _context.Add(Entity);
        }
        public void Update<T>(T Entity) where T : class
        {
            _context.Update(Entity);
            var entry = _context.Entry(Entity);
            if (entry.State == EntityState.Detached)
            {
                _context.Attach(Entity);
            }
            entry.State = EntityState.Modified;
        }
        public void Delete<T>(T Entity) where T : class
        {
            _context.Remove(Entity);
        }
        public void DeleteRange<T>(T[] EntityArray) where T : class
        {
            _context.RemoveRange(EntityArray);
        }
        public async Task<bool> SaveChangeAsync()
        {
            return (await _context.SaveChangesAsync()) >0;
        }
    }
}