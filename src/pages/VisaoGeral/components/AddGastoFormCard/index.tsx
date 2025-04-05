import React, { useState, useEffect } from 'react';
import {
    Card,
    Form,
    Input,
    InputNumber,
    Button,
    FormInstance,
    Space,
    Tooltip,
    Row,
    Col,
} from 'antd';
import { GastoFormValues } from '../../types';
import { categoriasGastos } from '../../constants';

interface AddGastoFormCardProps {
    form: FormInstance<GastoFormValues>;
    onFinish: (values: GastoFormValues) => Promise<void>;
    loading: boolean;
}

const AddGastoFormCard: React.FC<AddGastoFormCardProps> = ({
    form,
    onFinish,
    loading,
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(categoriasGastos[0].value);

    useEffect(() => {
        form.setFieldsValue({ categoria: selectedCategory });
    }, [form, selectedCategory]);

    const handleCategoryClick = (categoryValue: string) => {
        setSelectedCategory(categoryValue);
        form.setFieldsValue({ categoria: categoryValue });
    };

    // Encontrar o label da categoria selecionada
    const selectedCategoryLabel = 
        categoriasGastos.find(cat => cat.value === selectedCategory)?.label || 'Gasto'; // Fallback

    // Construir título dinâmico
    const cardTitle = `Adicionar Novo ${selectedCategoryLabel}`;

    return (
        <Card title={cardTitle} style={{}}>
            <Form
                form={form}
                layout='vertical'
                onFinish={onFinish}
            >
                <Form.Item label="Categoria" required>
                    <Space wrap size={[8, 8]}>
                        {categoriasGastos.map((cat) => (
                            <Tooltip title={cat.label} key={cat.value}>
                                <Button
                                    shape="circle"
                                    icon={cat.icon}
                                    type={selectedCategory === cat.value ? 'primary' : 'default'}
                                    onClick={() => handleCategoryClick(cat.value)}
                                />
                            </Tooltip>
                        ))}
                    </Space>
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label='Descrição'
                            name='descricao'
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira a descrição!',
                                },
                            ]}
                        >
                            <Input placeholder='Ex: Conta de luz' />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label='Valor (R$)'
                            name='valor'
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira o valor!',
                                },
                            ]}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                placeholder='Ex: 150.50'
                                precision={2}
                                decimalSeparator=','
                                step={0.01}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="categoria" hidden>
                    <Input />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, marginTop: 16 }}>
                    <Button type='primary' htmlType='submit' loading={loading}>
                        Adicionar Gasto
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AddGastoFormCard;
