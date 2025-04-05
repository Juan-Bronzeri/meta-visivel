import React from 'react'; // Import React for JSX Element type
// Importar os ícones que serão usados
import {
    RiseOutlined,
    HomeOutlined,
    SmileOutlined,
    CoffeeOutlined,
    FlagOutlined,
} from '@ant-design/icons';

// Tipo para o ícone
type CategoryIcon = React.ReactElement;

// Constantes específicas para a funcionalidade VisaoGeral

// Definição das categorias de gastos disponíveis no formulário
export const categoriasGastos: { value: string; label: string; icon: CategoryIcon }[] = [
    { value: 'investimento', label: 'Investimento', icon: <RiseOutlined /> },
    { value: 'custo_fixo', label: 'Custo Fixo', icon: <HomeOutlined /> },
    { value: 'prazer', label: 'Prazer', icon: <SmileOutlined /> },
    { value: 'conforto', label: 'Conforto', icon: <CoffeeOutlined /> },
    { value: 'metas', label: 'Metas', icon: <FlagOutlined /> },
];

// Mapeamento de descrições para cada categoria, usado nos tooltips do gráfico
export const categoryDescriptions: { [key: string]: string } = {
    'Investimento': 'Valores destinados a aplicações e crescimento patrimonial.',
    'Custo Fixo': 'Despesas recorrentes e essenciais (aluguel, contas básicas).',
    'Prazer': 'Gastos relacionados a lazer, hobbies e entretenimento.',
    'Conforto': 'Despesas que aumentam a qualidade de vida (streaming, delivery).',
    'Metas': 'Valores direcionados a objetivos específicos (viagem, compra).',
}; 