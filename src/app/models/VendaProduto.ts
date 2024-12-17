import { Estoque } from "./Estoque";

export interface VendaProduto {
    id?: number;
    estoque: Estoque;
    valorVenda: number;
    numParcela: number;
    valorParcela: number;
    descontoPorcento: number;    
}