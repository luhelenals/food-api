using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Receita
    {
        public int id { get; set; }
        public string titulo { get; set; } = string.Empty;
        public float compatibilidade { get; set; }
        public List<Ingrediente> ingredientes { get; set; } = new List<Ingrediente>();

        // Relação com Ingrediente
        public List<ReceitaIngrediente> ReceitaIngredientes { get; set; } = new List<ReceitaIngrediente>();

    }
}