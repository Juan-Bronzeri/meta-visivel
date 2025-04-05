import React from 'react';
import { Card, List, Tag, Empty } from 'antd'; // Adicionar Empty
import { GastoData } from '../types';

// Funções auxiliares (duplicadas, idealmente mover para utils)
const getCategoryColor = (categoria: string): string => {
    const colors: { [key: string]: string } = {
        'Investimento': '#16a085',
        'Custo Fixo': '#c0392b',
        'Prazer': '#2980b9',
        'Conforto': '#f39c12',
        'Metas': '#8e44ad',
    };
    return colors[categoria] || '#7f8c8d';
};

const formatCurrency = (value: number): string => {
    if (isNaN(value)) return 'R$ 0,00';
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

interface RecentGastosListCardProps {
    gastos: GastoData[];
    maxItems?: number; // Número máximo de itens a exibir (opcional)
}

const RecentGastosListCard: React.FC<RecentGastosListCardProps> = ({
    gastos,
    maxItems = 5, // Padrão para 5 itens
}) => {
    // Pegar os últimos 'maxItems' gastos e inverter
    const recentGastos = gastos.slice(-maxItems).reverse();

    return (
        <Card title="Últimos Gastos Adicionados">
            {recentGastos.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={recentGastos}
                    renderItem={(item, index) => (
                        <List.Item key={`${item.categoria}-${index}-${item.valor}`}>
                            <List.Item.Meta
                                title={
                                    <Tag color={getCategoryColor(item.categoria)}>
                                        {item.categoria}
                                    </Tag>
                                }
                                description={formatCurrency(item.valor)}
                            />
                        </List.Item>
                    )}
                     // Adicionar um limite de altura e scroll se necessário
                     // Ajustar este valor conforme o layout permitir
                    style={{ maxHeight: '300px', overflowY: 'auto' }}
                />
            ) : (
                <Empty description="Nenhum gasto adicionado recentemente." image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
        </Card>
    );
};

export default RecentGastosListCard; 