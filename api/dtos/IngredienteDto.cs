using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;

namespace api.dtos
{
    public class IngredienteDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public bool EmEstoque { get; set; }
        public List<ReceitaSummary> Receitas { get; set; } = new List<ReceitaSummary>();
    }
}