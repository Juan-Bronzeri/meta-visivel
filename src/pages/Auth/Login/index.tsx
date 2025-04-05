import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    Typography,
    Card,
    Row,
    Col,
    message, // Para exibir feedback
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../../contexts/AuthContext';
import { login } from '../../../services/authService';

const { Title } = Typography;

// Interface para os valores do formulário
interface LoginFormValues {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login: loginContext } = useAuth(); // Obter função de login do contexto

    const onFinish = async (values: LoginFormValues) => {
        setLoading(true);
        console.log('Login form values:', values);
        try {
            // Chamar API de login
            const response = await login(values.username, values.password);
            console.log('Login response:', response);

            if (response.accessToken) {
                // Usar a função do contexto para salvar token e estado
                loginContext(response.accessToken);
                message.success('Login bem sucedido!');
                navigate('/'); // Redireciona para a página principal
            } else {
                // Se a API retornar sucesso sem token (improvável com o backend atual)
                message.error('Resposta inesperada do servidor.');
            }
        } catch (error) {
            // Usar unknown e verificar o tipo
            console.error('Erro no login:', error);
            let errorMessage = 'Erro ao tentar fazer login. Tente novamente.';
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
            style={{
                minHeight: '100vh',
                background: '#fdfcff' /* Cor de fundo do tema claro */,
            }}
        >
            <Col xs={22} sm={16} md={12} lg={8} xl={6}>
                <Card style={{ borderRadius: '8px' }}>
                    <Title
                        level={2}
                        style={{ textAlign: 'center', marginBottom: '24px' }}
                    >
                        Login
                    </Title>
                    <Form
                        name='login_form'
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        size='large'
                    >
                        <Form.Item
                            name='username'
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira seu usuário!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder='Usuário'
                            />
                        </Form.Item>
                        <Form.Item
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, insira sua senha!',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined />}
                                placeholder='Senha'
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type='primary'
                                htmlType='submit'
                                loading={loading}
                                block
                            >
                                Entrar
                            </Button>
                        </Form.Item>

                        <Form.Item
                            style={{ textAlign: 'center', marginBottom: 0 }}
                        >
                            Não tem uma conta?{' '}
                            <Link to='/register'>Registre-se aqui</Link>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
};

export default LoginPage;
