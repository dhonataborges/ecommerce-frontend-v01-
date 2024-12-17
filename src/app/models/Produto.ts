import { FotoProduto } from "./FotoProduto";

export interface Produto {
    id?: number;
    codProd: string;
    nomeProd: string;
    descricao: string;
    categoria: number;
    descriCatedoria: string;
}