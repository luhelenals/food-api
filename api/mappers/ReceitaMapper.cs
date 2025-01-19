using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.data;
using api.dtos;
using api.models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace api.mappers
{
    public static class ReceitaMapper
    {
        public static ReceitaDto ToReceitaDto(this Receita ReceitaModel)
        {
            return new ReceitaDto
            {
                Id = ReceitaModel.Id,
                Titulo = ReceitaModel.Titulo,
                Ingredientes = ReceitaModel.Ingredientes
                    .Select(r => new IngredienteSummary
                    {
                        Id = r.Id,
                        Nome = r.Nome,
                        EmEstoque = r.EmEstoque
                    })
                    .ToList() // Converte para lista após o mapeamento
            };
        }

        public static Receita ToReceitaFromCreateDto(this CreateReceitaRequestDto receitaDto, ApplicationDBContext context)
        {
            List<Ingrediente> ingredientes = context
            .Ingredientes.Where(
                i => receitaDto.IdIngredientes
            .Contains(i.Id)).ToList();

            Receita receita = new Receita
            {
                Titulo = receitaDto.Titulo,
                Compatibilidade = receitaDto.Compatibilidade,
                Ingredientes = new List<Ingrediente>()
            };

            foreach (var ingrediente in ingredientes)
            {
                receita.Ingredientes.Add(ingrediente); // Adiciona ingrediente
            }

            return receita;
        }
    }
}