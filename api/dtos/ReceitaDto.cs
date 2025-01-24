using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;

namespace api.dtos
{
    public class ReceitaDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public float Compatibilidade { get; set; }
        public List<IngredienteSummary> Ingredientes { get; set; } = new List<IngredienteSummary>();
    }
}