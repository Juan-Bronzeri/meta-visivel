import React from 'react';
import { Card, Typography, Space, Switch } from 'antd';

import { SunOutlined, MoonOutlined } from '@ant-design/icons'; // Importar ícones
import { useTheme } from '../../../contexts/ThemeContext';
import { useFontSize } from '../../../contexts/FontSizeContext';

const { Title, Text } = Typography;

const PreferencesPage: React.FC = () => {
    const { fontSizeTheme, toggleFontSizeTheme } = useFontSize();
    const { themeMode, toggleTheme } = useTheme(); // Obter estado e função do tema de cor

    return (
        <Card title='Preferências de Exibição'>
            <Space direction='vertical' size='large' style={{ width: '100%' }}>
                <section>
                    <Title level={4}>Tamanho da Fonte</Title>
                    <Text
                        type='secondary'
                        style={{ display: 'block', marginBottom: '15px' }}
                    >
                        Escolha o tamanho de fonte preferido para a aplicação.
                    </Text>
                    <Space align='center'>
                        <Text
                            type={
                                fontSizeTheme === 'large'
                                    ? 'secondary'
                                    : undefined
                            }
                            style={{ minWidth: '50px', textAlign: 'right' }}
                        >
                            Normal
                        </Text>
                        <Switch
                            checked={fontSizeTheme === 'normal'}
                            onChange={toggleFontSizeTheme}
                            aria-label={`Mudar para tamanho ${
                                fontSizeTheme === 'normal' ? 'maior' : 'normal'
                            }`}
                        />
                        <Text
                            type={
                                fontSizeTheme === 'normal'
                                    ? 'secondary'
                                    : undefined
                            }
                            style={{ minWidth: '50px' }}
                        >
                            Maior
                        </Text>
                    </Space>
                </section>

                <section>
                    <Title level={4} style={{ marginTop: '10px' }}>
                        Tema de Cores
                    </Title>
                    <Text
                        type='secondary'
                        style={{ display: 'block', marginBottom: '15px' }}
                    >
                        Escolha entre o tema claro ou escuro.
                    </Text>
                    <Space align='center'>
                        <Text
                            type={
                                themeMode === 'dark' ? 'secondary' : undefined
                            }
                            style={{ minWidth: '50px', textAlign: 'right' }}
                        >
                            Claro
                        </Text>
                        <Switch
                            checkedChildren={<SunOutlined />}
                            unCheckedChildren={<MoonOutlined />}
                            checked={themeMode === 'light'}
                            onChange={toggleTheme}
                            aria-label={`Mudar para tema ${
                                themeMode === 'light' ? 'escuro' : 'claro'
                            }`}
                        />
                        <Text
                            type={
                                themeMode === 'light' ? 'secondary' : undefined
                            }
                            style={{ minWidth: '50px' }}
                        >
                            Escuro
                        </Text>
                    </Space>
                </section>

                {/* Adicionar outras preferências aqui no futuro */}
            </Space>
        </Card>
    );
};

export default PreferencesPage;
