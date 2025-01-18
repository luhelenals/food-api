using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class ReceitaIngrediente
    {
        public int ReceitaId { get; set; }
        public Receita Receita { get; set; } = null!;

        public int IngredienteId { get; set; }
        public Ingrediente Ingrediente { get; set; } = null!;
    }
}