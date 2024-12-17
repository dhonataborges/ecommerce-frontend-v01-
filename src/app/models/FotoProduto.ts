import { Produto } from "./Produto";

export interface FotoProduto {
    id?: number;
    produto: Produto
    nomeArquivo: string;
    descricao: string;
    contentType:string;
    tamanho: number;
}