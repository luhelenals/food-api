using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.dtos;
using api.mappers;
using api.models;
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
        public IActionResult GetIngredientes()
        {
            var ingredientes = _context.Ingredientes
                .Include(i => i.Receitas) // Inclui os relacionamentos
                .ToList()
                .Select(i => i.ToIngredienteDto()); // Usa o mapper

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

        [HttpPost]
        public IActionResult CreateIngrediente([FromBody] CreateIngredienteRequestDto ingredienteDto)
        {
            Ingrediente ingrediente = ingredienteDto.ToIngredienteFromCreateDto();

            _context.Ingredientes.Add(ingrediente);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = ingrediente.Id }, ingrediente.ToIngredienteDto());
        }
    }
}