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
            // Obter ingredientes do banco de dados em formato de lista
            var ingredientes = _context.Ingredientes
                .Include(i => i.Receitas) // Inclui os relacionamentos
                .ToList()
                .Select(i => i.ToIngredienteDto());

            return Ok(ingredientes);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            // Econtrar ingrediente do banco de dados baseado no Id
            var ingrediente = _context.Ingredientes.Find(id);

            if(ingrediente == null)
                return NotFound();
            
            return Ok(ingrediente);
        }

        [HttpPost]
        public IActionResult CreateIngrediente([FromBody] CreateIngredienteRequestDto ingredienteDto)
        {
            // Transformar DTO em objeto ingrediente
            Ingrediente ingrediente = ingredienteDto.ToIngredienteFromCreateDto();

            // Adicionar ingrediente ao banco de dados e salvar
            _context.Ingredientes.Add(ingrediente);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetById), new { id = ingrediente.Id }, ingrediente.ToIngredienteDto());
        }

        [HttpPut("{id}")]
        public IActionResult UpdateIngrediente([FromBody] CreateIngredienteRequestDto ingredienteDto, [FromRoute] int id)
        {
            // Obter ingrediente do banco de dados pelo Id
            var ingrediente = _context.Ingredientes
                .Include(r => r.Receitas)
                .FirstOrDefault(r => r.Id == id);

            if (ingrediente == null)
                return NotFound();

            // Atualização do nome e do estoque (caso necessário)
            if (!string.IsNullOrEmpty(ingredienteDto.Nome) && ingredienteDto.Nome != ingrediente.Nome)
                ingrediente.Nome = ingredienteDto.Nome;

            if (ingrediente.EmEstoque != ingredienteDto.EmEstoque)
                ingrediente.EmEstoque = ingredienteDto.EmEstoque;

            // Atualizar compatibilidade das receitas associadas ao ingrediente
            foreach (var receita in ingrediente.Receitas)
            {
                // Obter receita do banco de dados pelo Id
                var receitaToUpdate = _context.Receitas
                    .Include(i => i.Ingredientes)
                    .FirstOrDefault(r => r.Id == receita.Id);
                
                if (receitaToUpdate != null)
                {
                    receitaToUpdate.AtualizaCompatibilidade();
                    _context.Receitas.Attach(receitaToUpdate); // Garante que a entidade está no contexto
                }
                
                // Salvar modificações na base
                _context.SaveChanges();
            }

            // Salvar modificações na base
            _context.SaveChanges();

            return Ok(ingrediente.ToIngredienteDto());
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteIngrediente([FromRoute] int id)
        {
            // Obter ingrediente do banco de dados pelo Id
            var ingrediente = _context.Ingredientes
                .Include(r => r.Receitas)
                .FirstOrDefault(r => r.Id == id);

            if (ingrediente == null)
                return NotFound();

            // Remove ingrediente e salva alterações no banco de dados
            _context.Ingredientes.Remove(ingrediente);
            _context.SaveChanges();

            return GetIngredientes();
        }
    }
}