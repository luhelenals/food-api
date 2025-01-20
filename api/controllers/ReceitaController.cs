using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using api.data;
using api.dtos;
using api.mappers;
using api.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;

namespace api.controllers
{
    [Route("api/receita")]
    [ApiController]
    public class ReceitaController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        // construtor
        public ReceitaController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetReceitas()
        {
            // Obter receitas do banco de dados em formato de lista
            var receitas = _context.Receitas
                .Include(r => r.Ingredientes) // Carrega os ingredientes relacionados
                .ToList()
                .Select(r => r.ToReceitaDto());

            return Ok(receitas);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            // Obter receita pelo ID
            var receita = _context.Receitas
                .Include(i => i.Ingredientes)
                .ToList()
                .Select(r => r.ToReceitaDto())
                .FirstOrDefault(r => r.Id == id);

            if(receita == null)
                return NotFound();
            
            return Ok(receita);
        }

        [HttpPost]
        public IActionResult CreateReceita([FromBody] ReceitaRequestDto receitaDto)
        {
            // Criar objeto Receita a partir do DTO
            Receita receita = receitaDto.ToReceitaFromCreateDto(_context);

            // Adicionar receita ao banco de dados e salvar mudanças
            _context.Add(receita);
            _context.SaveChanges();
            
            return CreatedAtAction(nameof(GetById), new { id = receita.Id }, receita.ToReceitaDto());
        }

        [HttpPut("{id}")]
        public IActionResult EditReceita([FromBody] ReceitaRequestDto receitaDto, [FromRoute] int id)
        {
            // Obter os dados existentes na base
            var oldReceita = _context.Receitas
                .Include(r => r.Ingredientes)
                .FirstOrDefault(r => r.Id == id);

            if (oldReceita == null)
                return NotFound();

            // Atualização do título e descrição (caso necessário)
            if (!string.IsNullOrEmpty(receitaDto.Titulo) && receitaDto.Titulo != oldReceita.Titulo)
                oldReceita.Titulo = receitaDto.Titulo;

            if (!string.IsNullOrEmpty(receitaDto.Descricao) && receitaDto.Descricao != oldReceita.Descricao)
                oldReceita.Descricao = receitaDto.Descricao;

            // Modificar a relação com Ingredientes
            var newIngredientes = _context.Ingredientes
                .Where(i => receitaDto.IdIngredientes.Contains(i.Id))
                .ToList();

            // Limpar os ingredientes removidos
            if (newIngredientes.Count > 0)
                oldReceita.Ingredientes.RemoveAll(i => !newIngredientes.Contains(i));

            // Adicionar ingredientes novos
            foreach (var ingrediente in newIngredientes)
            {
                if (!oldReceita.Ingredientes.Contains(ingrediente))
                {
                    oldReceita.Ingredientes.Add(ingrediente);
                }
            }

            // Atualizar compatibilidade da receita
            oldReceita.AtualizaCompatibilidade();

            // Salvar modificações na base
            _context.SaveChanges();

            return Ok(oldReceita.ToReceitaDto());
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteReceita([FromRoute] int id)
        {
            // Obter receita pelo ID
            var receita = _context.Receitas.Find(id);

            if(receita == null)
                return NotFound();
            
            // Remover receita e salvar modificações na base
            _context.Receitas.Remove(receita);
            _context.SaveChanges();

            return GetReceitas();
        }
    }
}