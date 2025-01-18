using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Ingrediente
    {
        public int id { get; set; }
        public string nome { get; set; } = string.Empty;

        // Relação com Receita
        public List<ReceitaIngrediente> ReceitaIngredientes { get; set; } = new List<ReceitaIngrediente>();
    
    }
}