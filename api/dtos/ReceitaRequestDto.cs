using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.dtos
{
    public class ReceitaRequestDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public List<int> IdIngredientes { get; set; } = new List<int>();
    }
}