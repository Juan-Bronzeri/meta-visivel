import React, { useState } from 'react';
import {
    Row,
    Col,
    Typography,
    Card,
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    Collapse,
    message,
} from 'antd';
import { Pie, PieConfig, Datum } from '@ant-design/plots';

interface GastoData {
    categoria: string;
    valor: number;
}

interface GastoFormValues {
    descricao: string;
    valor: number;
    categoria: string;
}

const { Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const categoriasGastos = [
    { value: 'investimento', label: 'Investimento' },
    { value: 'custo_fixo', label: 'Custo Fixo' },
    { value: 'prazer', label: 'Prazer' },
    { value: 'conforto', label: 'Conforto' },
    { value: 'metas', label: 'Metas' },
];

// Descrições simples para cada categoria (exemplo)
const categoryDescriptions: { [key: string]: string } = {
    'Investimento': 'Valores destinados a aplicações e crescimento patrimonial.',
    'Custo Fixo': 'Despesas recorrentes e essenciais (aluguel, contas básicas).',
    'Prazer': 'Gastos relacionados a lazer, hobbies e entretenimento.',
    'Conforto': 'Despesas que aumentam a qualidade de vida (streaming, delivery).',
    'Metas': 'Valores direcionados a objetivos específicos (viagem, compra).',
};

function VisaoGeral() {
    const [gastosData, setGastosData] = useState<GastoData[]>([
        { categoria: 'Investimento', valor: 500 },
        { categoria: 'Custo Fixo', valor: 1200 },
        { categoria: 'Prazer', valor: 300 },
        { categoria: 'Conforto', valor: 450 },
        { categoria: 'Metas', valor: 200 },
    ]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [selectedCategoryData, setSelectedCategoryData] = useState<GastoData | null>(null);

    const configGrafico: PieConfig = {
        appendPadding: 10,
        data: gastosData,
        angleField: 'valor',
        colorField: 'categoria',
        radius: 0.8,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: ({ percent }: { percent: number }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                textAlign: 'center',
                fontSize: 12,
            },
        },
        interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
        statistic: {
            title: {
                offsetY: -8,
                style: { fontSize: '16px', color: 'rgba(0, 0, 0, 0.45)' },
                formatter: () => (selectedCategoryData ? selectedCategoryData.categoria : 'Total'),
            },
            content: {
                 offsetY: -4,
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: '20px',
                    fontWeight: 'bold'
                },
                formatter: () => {
                    const value = selectedCategoryData
                        ? selectedCategoryData.valor
                        : gastosData.reduce((sum, item) => sum + item.valor, 0);
                    return `R$ ${value.toFixed(2)}`;
                },
            },
        },
        legend: {
             position: 'top',
        },
        tooltip: {
            formatter: (datum: Datum) => {
                const categoria = datum.categoria as string;
                const valor = datum.valor as number;
                const description = categoryDescriptions[categoria] || 'Descrição não disponível';
                return { name: categoria, value: `R$ ${valor.toFixed(2)}\n${description}` };
            },
            customContent: (title: string | undefined, items: Datum[] | undefined) => {
                if (!items || items.length === 0) {
                    return '';
                }
                const data = items[0] as GastoData;
                const description = categoryDescriptions[data.categoria] || 'Descrição não disponível';
                const valueFormatted = `R$ ${data.valor.toFixed(2)}`;
                return `
                    <div style="padding: 8px 10px; font-size: 12px; ">
                        <h5 style="font-weight: bold; margin-bottom: 6px;">${data.categoria}</h5>
                        <p style="margin: 0;">${valueFormatted}</p>
                        <p style="margin-top: 4px; color: rgba(0,0,0,0.65);">${description}</p>
                    </div>
                 `;
            }
        },
    };

    const onFinishGasto = async (values: GastoFormValues) => {
        setLoading(true);
        console.log('Novo Gasto:', values);
        try {
            setGastosData(prevData => {
                const newData = [...prevData];
                const categoriaLabel = categoriasGastos.find(c => c.value === values.categoria)?.label || values.categoria;
                const existingIndex = newData.findIndex(item => item.categoria === categoriaLabel);
                if (existingIndex > -1) {
                    newData[existingIndex].valor += values.valor;
                } else {
                    newData.push({ categoria: categoriaLabel, valor: values.valor });
                }
                return newData;
            });
            message.success(`Gasto "${values.descricao}" adicionado com sucesso!`);
            form.resetFields();
        } catch (error) {
            console.error('Erro ao adicionar gasto:', error);
            let errorMessage = 'Erro ao adicionar gasto. Tente novamente.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row gutter={[16, 24]}>
            <Col span={24}>
                <Collapse defaultActiveKey={['1']} ghost>
                    <Panel header={<Title level={4} style={{marginBottom: 0}}>Resumo de Gastos</Title>} key="1">
                        {gastosData.length > 0 ? (
                           <Pie
                                {...configGrafico}
                                style={{ height: '350px' }}
                                onEvent={(chart, event: { type: string; data?: { data?: Datum } }) => {
                                    if (event.type === 'element:click') {
                                        const clickedData = event.data?.data as GastoData | undefined;
                                        setSelectedCategoryData(prev => 
                                            prev?.categoria === clickedData?.categoria ? null : clickedData || null
                                        );
                                    } else if (event.type === 'plot:click' || event.type === 'legend-item:click') {
                                        setSelectedCategoryData(null);
                                    }
                                }}
                           />
                        ) : (
                           <Typography.Text type="secondary">Nenhum dado de gasto para exibir.</Typography.Text>
                        )}
                    </Panel>
                </Collapse>
            </Col>
            <Col span={24}>
                <Card title="Adicionar Novo Gasto">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinishGasto}
                        initialValues={{ categoria: categoriasGastos[0].value }}
                    >
                        <Row gutter={16}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    label="Descrição"
                                    name="descricao"
                                    rules={[{ required: true, message: 'Por favor, insira a descrição!' }]}
                                >
                                    <Input placeholder="Ex: Conta de luz" />
                                </Form.Item>
                            </Col>
                             <Col xs={12} md={6}>
                                <Form.Item
                                    label="Valor (R$)"
                                    name="valor"
                                    rules={[{ required: true, message: 'Por favor, insira o valor!' }]}
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        placeholder="Ex: 150.50"
                                        precision={2}
                                        decimalSeparator=","
                                        step={0.01}
                                    />
                                </Form.Item>
                            </Col>
                             <Col xs={12} md={6}>
                                <Form.Item
                                    label="Categoria"
                                    name="categoria"
                                    rules={[{ required: true, message: 'Por favor, selecione a categoria!' }]}
                                >
                                    <Select placeholder="Selecione a categoria">
                                        {categoriasGastos.map(cat => (
                                            <Option key={cat.value} value={cat.value}>{cat.label}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Adicionar Gasto
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default VisaoGeral;
