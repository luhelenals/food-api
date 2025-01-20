using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.dtos
{
    public class CreateReceitaRequestDto
    {
        public string Titulo { get; set; } = string.Empty;
        public List<int> IdIngredientes { get; set; } = new List<int>();
    }
}