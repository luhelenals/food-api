export interface Receita {
    id?: number;
    titulo: string;
    descricao: string;
    compatibilidade?: number;
    idIngredientes: number[];
}

export interface ReceitaResponse {
    $id: string;
    $values: Receita[];
}