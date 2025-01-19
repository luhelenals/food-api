using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.controllers
{
    [Route("api/ingrediente")]
    [ApiController]
    public class IngredienteController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public IngredienteController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetIngredientes()
        {
            var ingredientes = await _context.Ingredientes
                .Include(i => i.Receitas) // Carrega as receitas relacionadas
                .ToListAsync();

            return Ok(ingredientes);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            var ingrediente = _context.Ingredientes.Find(id);

            if(ingrediente == null)
                return NotFound();
            
            return Ok(ingrediente);
        }
    }
}