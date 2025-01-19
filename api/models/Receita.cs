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
        public float Compatibilidade { get; set; }
        public List<Ingrediente> Ingredientes { get; set; } = new List<Ingrediente>();

        // Relação com Ingrediente
        public List<ReceitaIngrediente> ReceitaIngredientes { get; set; } = new List<ReceitaIngrediente>();

    }
}