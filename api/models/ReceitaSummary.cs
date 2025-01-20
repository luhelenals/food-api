using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class ReceitaSummary
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public float Compatibilidade { get; set; }
    }
}