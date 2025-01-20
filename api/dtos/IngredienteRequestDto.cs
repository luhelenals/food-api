using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.dtos
{
    public class IngredienteRequestDto
    {
        public string Nome { get; set; } = string.Empty;
        public bool EmEstoque { get; set; }
    }
}