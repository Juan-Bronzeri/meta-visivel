import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Typography,
    Form,
    message,
    Space,
    // Remover imports não utilizados
    // Card,
    // Spin,
    // Statistic,
} from 'antd';
import { GastoData, GastoFormValues } from './types';
import AddGastoFormCard from './components/AddGastoFormCard';
import GastosChartCard from './components/GastosChartCard';
import BudgetManager from './components/BudgetManager';
import RecentGastosListCard from './components/RecentGastosListCard';
import { categoriasGastos } from './constants';

// Remover Text não utilizado
const { Title /*, Text */ } = Typography;

// --- Mock API Simulado ---
// Manter apenas o fetch inicial aqui, o save será tratado no BudgetManager
const fetchBudgetAPI = (): Promise<number | null> => {
    console.log('[API Simulada] Buscando orçamento...');
    return new Promise((resolve) => {
        setTimeout(() => {
            const savedBudget = localStorage.getItem('totalBudget');
            const budgetValue = savedBudget ? parseFloat(savedBudget) : null;
            console.log('[API Simulada] Orçamento encontrado:', budgetValue);
            resolve(budgetValue);
        }, 700);
    });
};
// --- Fim Mock API ---

// Mock de dados inicial
const initialGastosData: GastoData[] = [
    { categoria: 'Investimento', valor: 500 },
    { categoria: 'Custo Fixo', valor: 1200 },
    { categoria: 'Prazer', valor: 300 },
    { categoria: 'Conforto', valor: 450 },
    { categoria: 'Metas', valor: 200 },
];

function VisaoGeral() {
    const [gastosData, setGastosData] =
        useState<GastoData[]>(initialGastosData);
    const [selectedCategoryData, setSelectedCategoryData] =
        useState<GastoData | null>(null);
    const [loadingForm, setLoadingForm] = useState(false);
    const [form] = Form.useForm<GastoFormValues>();

    // Estados para o Orçamento (simplificado)
    const [totalBudget, setTotalBudget] = useState<number | null>(null);
    const [isBudgetLoading, setIsBudgetLoading] = useState<boolean>(true);

    // Efeito para buscar o orçamento inicial
    useEffect(() => {
        setIsBudgetLoading(true);
        fetchBudgetAPI()
            .then((savedBudget) => {
                setTotalBudget(savedBudget);
            })
            .catch((err) => {
                console.error('Erro ao buscar orçamento:', err);
                message.error('Falha ao carregar orçamento salvo.');
            })
            .finally(() => {
                setIsBudgetLoading(false);
            });
    }, []);

    // Callback para salvar o orçamento (agora apenas atualiza o estado)
    const handleSaveBudget = (newBudget: number) => {
        setTotalBudget(newBudget);
        // A lógica de API e mensagem foi movida para BudgetManager
    };

    // Callback para lidar com a submissão do formulário
    const handleFinishGasto = async (values: GastoFormValues) => {
        setLoadingForm(true);
        console.log('Novo Gasto:', values);
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
            setGastosData((prevData) => {
                const newData = [...prevData];
                const categoriaLabel =
                    categoriasGastos.find((c) => c.value === values.categoria)
                        ?.label || values.categoria;
                const existingIndex = newData.findIndex(
                    (item) => item.categoria === categoriaLabel
                );
                if (existingIndex > -1) {
                    newData[existingIndex].valor += values.valor;
                } else {
                    newData.push({
                        categoria: categoriaLabel,
                        valor: values.valor,
                    });
                }
                return newData;
            });
            message.success(
                `Gasto "${values.descricao}" adicionado com sucesso!`
            );
            form.resetFields();
        } catch (error) {
            console.error('Erro ao adicionar gasto:', error);
            let errorMessage = 'Erro ao adicionar gasto. Tente novamente.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            message.error(errorMessage);
        } finally {
            setLoadingForm(false);
        }
    };

    // Callback para lidar com a seleção no gráfico
    const handleSelectCategory = (data: GastoData | null) => {
        setSelectedCategoryData(data);
    };

    return (
        <Space direction='vertical' size='large' style={{ width: '100%' }}>
            {/* Linha Título e Gerenciador de Orçamento */}
            <Row
                justify='space-between'
                align='middle'
                style={{ marginBottom: 16 /* Espaço extra */ }}
            >
                <Col>
                    <Title level={2} style={{ marginBottom: 0 }}>
                        Visão Geral
                    </Title>
                </Col>
                <Col xs={24} sm={12} md={10} lg={8} xl={6}>
                    <BudgetManager
                        currentBudget={totalBudget}
                        onSaveBudget={handleSaveBudget}
                        isLoadingExternally={isBudgetLoading}
                    />
                </Col>
            </Row>

            {/* Linha Gráfico e Coluna de Cards (Formulário + Lista) */}
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={14} xl={16}>
                    <GastosChartCard
                        gastosData={gastosData}
                        selectedCategoryData={selectedCategoryData}
                        onSelectCategory={handleSelectCategory}
                    />
                </Col>
                <Col xs={24} lg={10} xl={8}>
                    <Space
                        direction='vertical'
                        size='large'
                        style={{ width: '100%' }}
                    >
                        <AddGastoFormCard
                            form={form}
                            onFinish={handleFinishGasto}
                            loading={loadingForm}
                        />
                        <RecentGastosListCard gastos={gastosData} />
                    </Space>
                </Col>
            </Row>
        </Space>
    );
}

export default VisaoGeral;
