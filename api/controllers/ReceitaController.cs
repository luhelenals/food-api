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
        public IActionResult GetReceitas()
        {
            var receitas = _context.Receitas
                .Include(r => r.Ingredientes) // Carrega os ingredientes relacionados
                .ToList()
                .Select(r => r.ToReceitaDto());

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

        [HttpPost]
        public IActionResult CreateReceita([FromBody] CreateReceitaRequestDto receitaDto)
        {
            Receita receita = receitaDto.ToReceitaFromCreateDto(_context);

            _context.Add(receita);
            _context.SaveChanges();
            
            return CreatedAtAction(nameof(GetById), new { id = receita.Id }, receita.ToReceitaDto());
        }
    }
}