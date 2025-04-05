import React, { useMemo } from 'react';
import { Card, Typography, Row, Col, Table, Tag } from 'antd';
import { Pie, PieConfig, Datum } from '@ant-design/plots';
import { GastoData } from '../../types';
import { categoryDescriptions } from '../../constants';

// Função placeholder para cores - substituir pela real
const getCategoryColor = (categoria: string): string => {
    // Mapeamento simples de exemplo
    const colors: { [key: string]: string } = {
        Investimento: '#16a085',
        'Custo Fixo': '#c0392b',
        Prazer: '#2980b9',
        Conforto: '#f39c12',
        Metas: '#8e44ad',
    };
    return colors[categoria] || '#7f8c8d'; // Cor padrão
};

interface GastosChartCardProps {
    gastosData: GastoData[];
    selectedCategoryData: GastoData | null;
    onSelectCategory: (data: GastoData | null) => void; // Callback para seleção
}

// Helper para formatar moeda
const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

const GastosChartCard: React.FC<GastosChartCardProps> = ({
    gastosData,
    selectedCategoryData,
    onSelectCategory,
}) => {
    // Memoizar a configuração do gráfico para evitar recálculos
    const configGrafico: PieConfig = useMemo(
        () => ({
            appendPadding: 10,
            data: gastosData,
            angleField: 'valor',
            colorField: 'categoria',
            radius: 0.8,
            innerRadius: 0.6,
            label: {
                type: 'inner',
                offset: '-50%',
                content: ({ percent }: { percent: number }) =>
                    `${(percent * 100).toFixed(0)}%`,
                style: {
                    textAlign: 'center',
                    fontSize: 12,
                    fill: '#fff', // Cor do texto interno (ajustar se necessário)
                },
            },
            interactions: [
                { type: 'element-selected' },
                { type: 'element-active' },
            ],
            statistic: {
                title: {
                    offsetY: -8,
                    style: { fontSize: '16px' }, // Remover cor fixa
                    formatter: () =>
                        selectedCategoryData
                            ? selectedCategoryData.categoria
                            : 'Total',
                },
                content: {
                    offsetY: -4,
                    style: {
                        whiteSpace: 'pre-wrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    },
                    formatter: () => {
                        const value = selectedCategoryData
                            ? selectedCategoryData.valor
                            : gastosData.reduce(
                                  (sum, item) => sum + item.valor,
                                  0
                              );
                        return formatCurrency(value);
                    },
                },
            },
            legend: {
                position: 'top',
                flipPage: false, // Considerar paginação da legenda se houver muitas categorias
            },
            tooltip: {
                // Formatter original removido, customContent é mais flexível
                customContent: (
                    title: string | undefined,
                    items: Datum[] | undefined
                ) => {
                    if (!items || items.length === 0) {
                        return '';
                    }
                    // Assegurar que estamos tratando como GastoData
                    const data = items[0].data as GastoData;
                    if (!data) return ''; // Checagem extra

                    const description =
                        categoryDescriptions[data.categoria] ||
                        'Descrição não disponível';
                    const valueFormatted = formatCurrency(data.valor);

                    // Usar estilos mais robustos ou classes CSS se necessário
                    return `
                    <div style="padding: 8px 10px; font-size: 12px; border-radius: 4px; background: rgba(0, 0, 0, 0.75); color: white;">
                        <h5 style="font-weight: bold; margin: 0 0 6px 0; color: white;">${data.categoria}</h5>
                        <p style="margin: 0;">${valueFormatted}</p>
                        <p style="margin-top: 4px; color: rgba(255,255,255,0.85);">${description}</p>
                    </div>
                 `;
                },
            },
            color: gastosData.map((g) => getCategoryColor(g.categoria)),
        }),
        [gastosData, selectedCategoryData]
    ); // Dependências do useMemo

    const handleChartEvent = (
        chart: unknown,
        event: { type: string; data?: { data?: Datum } }
    ) => {
        if (event.type === 'element:click') {
            const clickedData = event.data?.data as GastoData | undefined;
            // Se clicar no mesmo item selecionado, desmarca; senão, marca o novo
            onSelectCategory(
                selectedCategoryData?.categoria === clickedData?.categoria
                    ? null
                    : clickedData || null
            );
        } else if (
            event.type === 'plot:click' ||
            event.type === 'legend-item:click'
        ) {
            // Clicar fora das fatias ou na legenda desmarca a seleção
            onSelectCategory(null);
        }
    };

    // Configuração das colunas da tabela
    const tableColumns = [
        {
            title: 'Categoria',
            dataIndex: 'categoria',
            key: 'categoria',
            render: (categoria: string) => (
                <Tag color={getCategoryColor(categoria)} key={categoria}>
                    {categoria}
                </Tag>
            ),
        },
        {
            title: 'Valor Gasto',
            dataIndex: 'valor',
            key: 'valor',
            align: 'right' as const,
            render: (valor: number) => formatCurrency(valor),
        },
    ];

    // Calcular o total gasto para o rodapé da tabela
    const totalGasto = useMemo(
        () => gastosData.reduce((sum, item) => sum + item.valor, 0),
        [gastosData]
    );

    return (
        <Card title='Resumo de Gastos'>
            {gastosData.length > 0 ? (
                <Row gutter={[24, 16]}>
                    {' '}
                    {/* Aumentei o gutter horizontal */}
                    <Col xs={24} md={14} xl={15}>
                        {' '}
                        {/* Coluna do Gráfico */}
                        <Pie
                            {...configGrafico}
                            style={{ height: '350px' }}
                            onEvent={handleChartEvent}
                        />
                    </Col>
                    <Col xs={24} md={10} xl={9}>
                        {' '}
                        {/* Coluna da Tabela */}
                        <Typography.Title
                            level={5}
                            style={{ marginBottom: 16 }}
                        >
                            Gastos por Categoria
                        </Typography.Title>
                        <Table
                            dataSource={gastosData}
                            columns={tableColumns}
                            rowKey='categoria'
                            pagination={false}
                            size='small'
                            // Adicionar rodapé com o total
                            footer={() => (
                                <div
                                    style={{
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Total Gasto: {formatCurrency(totalGasto)}
                                </div>
                            )}
                            scroll={{ y: 250 }} // Permitir scroll vertical se a tabela ficar grande
                        />
                        {/* Área para informações futuras (Restante) */}
                        <div
                            style={{
                                marginTop: 16,
                                textAlign: 'right',
                                fontStyle: 'italic',
                            }}
                        >
                            {/* Exemplo: <Typography.Text type="secondary">Restante: R$ XXX,XX</Typography.Text> */}
                        </div>
                    </Col>
                </Row>
            ) : (
                <Typography.Text type='secondary'>
                    Nenhum dado de gasto para exibir.
                </Typography.Text>
            )}
        </Card>
    );
};

export default GastosChartCard;
