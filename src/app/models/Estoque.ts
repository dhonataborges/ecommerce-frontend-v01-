import { Produto } from "./Produto";
export interface Estoque {
    id?: number;
    produto: Produto;
    dataEntrada: string;
    dataSaida?: Date;
    valorUnid: number;
    qtdProd: number;   
}