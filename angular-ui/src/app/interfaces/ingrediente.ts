export interface Ingrediente {
    id: number;
    nome: string;
    emEstoque: boolean;
}

export interface IngredienteRequest {
    nome: string;
    emEstoque: boolean;
}

export interface IngredienteResponse {
    $id: string;
    $values: Ingrediente[];
}