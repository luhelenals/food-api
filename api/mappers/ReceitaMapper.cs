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
                Descricao = ReceitaModel.Descricao,
                Compatibilidade = ReceitaModel.Compatibilidade,
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

        public static Receita ToReceitaFromCreateDto(this ReceitaRequestDto receitaDto, ApplicationDBContext context)
        {
            // Obtém a lista de ingredientes que possuem relação com a receita
            List<Ingrediente> ingredientes = context
            .Ingredientes.Where(
                i => receitaDto.IdIngredientes
            .Contains(i.Id)).ToList();

            // Cria uma nova receita
            Receita receita = new Receita
            {
                Titulo = receitaDto.Titulo,
                Descricao = receitaDto.Descricao,
                Ingredientes = new List<Ingrediente>()
            };

            // Adiciona ingredientes na lista de ingredientes
            foreach (var ingrediente in ingredientes)
            {
                receita.Ingredientes.Add(ingrediente);
            }

            // Determina a compatibilidade
            receita.AtualizaCompatibilidade();

            return receita;
        }
    }
}