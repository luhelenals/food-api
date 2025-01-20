using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dtos;
using api.models;

namespace api.mappers
{
    public static class IngredienteMapper
    {
        public static IngredienteDto ToIngredienteDto(this Ingrediente ingredienteModel)
        {
            return new IngredienteDto
            {
                Id = ingredienteModel.Id,
                Nome = ingredienteModel.Nome,
                EmEstoque = ingredienteModel.EmEstoque,
                Receitas = ingredienteModel.Receitas
                    .Select(r => new ReceitaSummary
                    {
                        Id = r.Id,
                        Titulo = r.Titulo,
                        Compatibilidade = r.Compatibilidade
                    })
                    .ToList() // Converte para lista após o mapeamento
            };
        }

        public static Ingrediente ToIngredienteFromCreateDto(this CreateIngredienteRequestDto ingredienteDto)
        {
            return new Ingrediente
            {
                Nome = ingredienteDto.Nome,
                EmEstoque = ingredienteDto.EmEstoque
            };
        }
    }
}