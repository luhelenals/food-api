export interface Receita {
    id: number;
    titulo: string;
    descricao: string;
    compatibilidade: number;
    idIngredientes: number[];
}

export interface ReceitaRequest {
    titulo: string;
    descricao?: string;
    idIngredientes: number[];
}

export interface ReceitaResponse {
    $id: string;
    $values: Receita[];
}