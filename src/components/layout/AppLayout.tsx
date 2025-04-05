import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Layout,
    Menu,
    Typography,
    Grid,
    Space,
    Avatar,
    Popover,
    theme,
} from 'antd';
import type { MenuProps } from 'antd';
import {
    SettingOutlined,
    UserOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import Sidebar from '../Sidebar/Sidebar'; // Ajustar caminho relativo
import { useTheme } from '../../contexts/ThemeContext'; // Ajustar caminho relativo
import { useAuth } from '../../contexts/AuthContext'; // Ajustar caminho relativo

// Importar tipos e dados dos novos locais
import type { MenuItem } from '../../utils/menuUtils'; // Corrigir caminho
import { menuItems } from '../../config/menuItems'; // Corrigir caminho
import { getItem } from '../../utils/menuUtils'; // Corrigir caminho

const { Header, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

// Componente de Layout Principal com AntD
export const AppLayout: React.FC = () => { // Exportar o componente
    const location = useLocation();
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);
    const { themeMode } = useTheme();
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleUserMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'logout') {
            logout();
            navigate('/login');
        } else if (e.key === 'settings') {
            // Implementar navegação para settings
            console.log('Navegar para Settings');
        } else if (e.key === 'preferences') {
            navigate('/preferences');
        }
    };

    // Recriar userMenuContent usando getItem importado
    const userMenuContent = (
        <Menu
            onClick={handleUserMenuClick}
            items={[
                getItem('Configurações', 'settings', <SettingOutlined />),
                getItem('Preferências', 'preferences', <UserOutlined />),
                { type: 'divider' },
                getItem('Sair', 'logout', <LogoutOutlined />),
            ]}
        />
    );

    // Calcular selectedKeys e defaultOpenKeys usando menuItems importado
    const selectedKeys = [location.pathname];
    const defaultOpenKeys = menuItems
        .filter(
            // Tipar item explicitamente
            (item: MenuItem) =>
                item?.key && location.pathname.startsWith(item.key as string)
        )
        // Tipar item explicitamente
        .map((item: MenuItem) => item?.key as string);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar
                collapsed={collapsed}
                onCollapse={setCollapsed}
                menuItems={menuItems} // Passar menuItems importado
                selectedKeys={selectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                themeMode={themeMode}
            />
            <Layout
                style={{
                    marginLeft:
                        collapsed && screens.lg ? 80 : screens.lg ? 240 : 0,
                    transition: 'margin-left 0.2s',
                }}
            >
                <Header
                    style={{
                        padding: '0 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // Usar useToken() aqui dentro pois está no escopo do componente
                        borderBottom: `1px solid ${theme.useToken().token.colorBorder}`,
                        background: theme.useToken().token.colorBgContainer,
                    }}
                >
                    <Title
                        level={3}
                        style={{ margin: 0, color: theme.useToken().token.colorTextBase }}
                    >
                        Orçamento Pessoal
                    </Title>
                    <Space align='center'>
                        <Popover
                            placement='bottomRight'
                            content={userMenuContent}
                            trigger='click'
                        >
                            <Avatar
                                style={{ cursor: 'pointer' }}
                                icon={<UserOutlined />}
                            />
                        </Popover>
                    </Space>
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}; 