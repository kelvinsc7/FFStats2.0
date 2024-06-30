using FFStats.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace FFStats.Persistence.Contextos
{
    public class FFStatsContext : DbContext
    {

        public FFStatsContext(DbContextOptions<FFStatsContext> options): base(options){ }
        public DbSet<Partida> Partidas { get; set; }
        public DbSet<Jogador> Jogadores{ get; set; }
        public DbSet<Call> Calls{ get; set; }
        public DbSet<Estatisticas> Estatisticas{ get; set; }
        public DbSet<Mapa> Mapas{ get; set; }
        public DbSet<Submodo> Submodos{ get; set; }
        public DbSet<Treino> Treinos{ get; set; }
        public DbSet<Modo> Modos{ get; set; }
        public DbSet<PartidaJogador> PartidasJogadores{ get; set; }
        public DbSet<Line> Lines{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)//criado para relação n:n de tabela, relacionando o campo com as tabelas
        {
            modelBuilder.Entity<PartidaJogador>()
                        .HasKey(PE => new{PE.PartidaId, PE.JogadorId});

            modelBuilder.Entity<Partida>()
                        .HasMany(p => p.PartidasJogadores)
                        .WithOne(pj => pj.Partida)
                        .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Treino>()
                        .HasMany(t => t.Partidas)
                        .WithOne(p => p.treino)
                        .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Modo>()
                        .HasMany(m => m.SubModos)
                        .WithOne(sm => sm.modo)
                        .OnDelete(DeleteBehavior.Cascade);   
            modelBuilder.Entity<Mapa>()
                        .HasMany(m => m.Calls)
                        .WithOne(c => c.mapa)
                        .OnDelete(DeleteBehavior.Cascade); 
            modelBuilder.Entity<Partida>()
                        .HasMany(p => p.Estatisticas)
                        .WithOne(e => e.Partida)
                        .OnDelete(DeleteBehavior.Cascade); 
            modelBuilder.Entity<Jogador>()
                        .ToTable("tb_jogador")
                        .HasKey(j => j.id);
            modelBuilder.Entity<Jogador>()
                        .HasOne(j => j.Line)
                        .WithMany(l => l.Jogadores)
                        .HasForeignKey(j => j.lineId);
            modelBuilder.Entity<Jogador>()
                        .HasMany(j => j.PartidasJogadores)
                        .WithOne(pj => pj.Jogador)
                        .HasForeignKey(pj => pj.JogadorId);          
        }

    }
}