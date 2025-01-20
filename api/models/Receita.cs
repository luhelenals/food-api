using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Receita
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public float Compatibilidade { get; set; }
        public List<Ingrediente> Ingredientes { get; set; } = new List<Ingrediente>();

        public void AtualizaCompatibilidade()
        {
            if (Ingredientes.Count == 0)
            {
                Compatibilidade = 0;
                return;
            }
            
            // Seleciona ingredientes em estoque
            var ingredientesEmEstoque = 
                from ingrediente
                in Ingredientes
                where ingrediente.EmEstoque
                select ingrediente;
            
            // Determina a compatibilidade baseada na razão entre ingredientes necessários e em estoque
            Compatibilidade = (float)ingredientesEmEstoque.Count()/Ingredientes.Count;
        }
    }
}