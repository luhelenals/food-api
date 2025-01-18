using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class ReceitaIngrediente
    {
        public int id { get; set; }

        public int receitaId { get; set; }
        public Receita receita { get; set; } = null!;

        public int ingredienteId { get; set; }
        public Ingrediente ingrediente { get; set; } = null!;
    }
}