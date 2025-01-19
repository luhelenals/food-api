using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Definir a tabela de junção (Muitos-para-Muitos)
            modelBuilder.Entity<ReceitaIngrediente>()
                .HasKey(ri => ri.Id);

            modelBuilder.Entity<ReceitaIngrediente>()
                .HasOne(ri => ri.Receita)
                .WithMany(r => r.ReceitaIngredientes)
                .HasForeignKey(ri => ri.ReceitaId);

            modelBuilder.Entity<ReceitaIngrediente>()
                .HasOne(ri => ri.Ingrediente)
                .WithMany(i => i.ReceitaIngredientes)
                .HasForeignKey(ri => ri.IngredienteId);
        }

        public DbSet<Receita> Receitas { get; set; }
        public DbSet<Ingrediente> Ingredientes { get; set; }

    }
}