using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dtos;
using api.models;

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
        
    }
}