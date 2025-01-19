using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class IngredienteSummary
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public bool EmEstoque { get; set; }
    }
}