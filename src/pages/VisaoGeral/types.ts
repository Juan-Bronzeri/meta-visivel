// Tipos de dados específicos para a funcionalidade VisaoGeral

// Representa um item de dado no gráfico e na lista de gastos
export interface GastoData {
    categoria: string;
    valor: number;
}

// Representa os valores do formulário de adição de gasto
export interface GastoFormValues {
    descricao: string;
    valor: number;
    categoria: string; // O valor da categoria (e.g., 'investimento')
} 