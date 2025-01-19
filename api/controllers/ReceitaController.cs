using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.controllers
{
    [Route("api/receita")]
    [ApiController]
    public class ReceitaController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public ReceitaController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetReceitas()
        {
            var receitas = await _context.Receitas
                .Include(r => r.Ingredientes) // Carrega os ingredientes relacionados
                .ToListAsync();

            return Ok(receitas);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var receita = _context.Receitas.Find(id);

            if(receita == null)
                return NotFound();
            
            return Ok(receita);
        }
    }
}