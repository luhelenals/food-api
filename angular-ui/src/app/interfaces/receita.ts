export interface Receita {
    id: number;
    titulo: string;
    descricao: string;
    compatibilidade: number;
    ingredientes: any[];
}

export interface ReceitaResponse {
    $id: string;
    $values: Receita[];
}