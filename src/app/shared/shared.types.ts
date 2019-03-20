export interface IAeroporto {
    nome: string;
    aeroporto: string;
    cidade: string;
}

export interface  IVooEscalado {
    voo: string;
    origem: string;
    destino: string;
    data_saida: string;
    saida: string;
    chegada: string;
    valor?: number;
    valorFormatado?: string;
}

export interface IVoo {
    qtdVoos: number;
    tempoTotalVoo?: number;
    tempoTotalVooFormatado?: string;
    valorTotal?: number;
    valorTotalFormatado?: string;
    voosEscalados: Array<IVooEscalado>;
}