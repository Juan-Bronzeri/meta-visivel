import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Adicionar Link
import { Form, Input, Button, Typography, Card, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'; // Adicionar MailOutlined
import { register } from '../../../services/authService';
// Importar função de registro

const { Title } = Typography;

// Interface para os valores do formulário
interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
}

const RegisterPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values: RegisterFormValues) => {
        setLoading(true);
        console.log('Register form values:', values);
        try {
            await register(values.username, values.email, values.password);
            message.success(
                'Registro bem sucedido! Você pode fazer login agora.'
            );
            navigate('/login'); // Redireciona para login após registro
        } catch (error) {
            console.error('Erro no registro:', error);
            let errorMessage = 'Erro ao tentar registrar. Tente novamente.';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Row
            justify='center'
            align='middle'
            style={{ minHeight: '100vh', background: '#fdfcff' }}
        >
            <Col xs={22} sm={16} md={12} lg={8} xl={6}>
                <Card style={{ borderRadius: '8px' }}>
                    <Title
                        level={2}
                        style={{ textAlign: 'center', marginBottom: '24px' }}
                    >
                        Registrar
                    </Title>
                    <Form
                        name='register_form'
                        onFinish={onFinish}
                        size='large'
                        autoComplete='off'
                    >
                        <Form.Item
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Por favor, insira seu nome de usuário!',
                                },
                                {
                                    min: 3,
                                    message:
                                        'Usuário deve ter pelo menos 3 caracteres.',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder='Nome de Usuário'
                            />
                        </Form.Item>

                        <Form.Item
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira seu email!',
                                },
                                {
                                    type: 'email',
                                    message:
                                        'Por favor, insira um email válido!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder='Email'
                            />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira sua senha!',
                                },
                                {
                                    min: 6,
                                    message:
                                        'Senha deve ter pelo menos 6 caracteres.',
                                },
                                // TODO: Adicionar regras de complexidade de senha (ex: regex)
                            ]}
                            hasFeedback // Mostra ícone de validação
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder='Senha'
                            />
                        </Form.Item>

                        <Form.Item
                            name='confirmPassword'
                            dependencies={['password']} // Depende do campo 'password'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, confirme sua senha!',
                                },
                                // Validador customizado para verificar se as senhas coincidem
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue('password') === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                'As senhas não coincidem!'
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder='Confirmar Senha'
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={loading}
                                block
                            >
                                Registrar
                            </Button>
                        </Form.Item>

                        <Form.Item style={{ textAlign: 'center' }}>
                            Já tem uma conta?{' '}
                            <Link to='/login'>Faça login</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default RegisterPage;
