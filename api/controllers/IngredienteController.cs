using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetAll()
        {
            var ingredientes = _context.Ingredientes.ToList();

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