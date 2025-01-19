using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Ingrediente
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public bool EmEstoque { get; set; }
        public List<Receita> Receitas { get; set; } = new List<Receita>();

        // Relação com Receita
        public List<ReceitaIngrediente> ReceitaIngredientes { get; set; } = new List<ReceitaIngrediente>();
    }
}