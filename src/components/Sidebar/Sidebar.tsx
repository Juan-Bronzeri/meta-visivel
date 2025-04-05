import React from 'react';
import { Layout, Menu, Typography, Grid, theme } from 'antd';
import type { MenuProps } from 'antd';
import { DashboardOutlined, SettingOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
    menuItems: MenuProps['items'];
    selectedKeys: string[];
    defaultOpenKeys: string[];
    themeMode: 'light' | 'dark';
}

const Sidebar: React.FC<SidebarProps> = ({
    collapsed,
    onCollapse,
    menuItems,
    selectedKeys,
    defaultOpenKeys,
    themeMode
}) => {
    const screens = useBreakpoint();
    const { token } = theme.useToken(); // Obter tokens do tema atual

    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            breakpoint="lg"
            width={240} // Largura definida
            // Calcular collapsedWidth aqui dentro ou receber como prop?
            // Por simplicidade, vamos recalcular aqui, mas poderia ser prop.
            collapsedWidth={screens.lg ? 80 : 0}
            theme={themeMode}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                borderRight: `1px solid ${token.colorBorder}`,
                // Background vem do tema aplicado globalmente via ConfigProvider
            }}
        >
            {/* Título/Logo */}
            <div
                style={{
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    marginBottom: '10px',
                }}
            >
                {!collapsed && (
                    <Title
                        level={4}
                        style={{ color: token.colorPrimary, margin: 0 }}
                    >
                        Orçamento
                    </Title>
                )}
                {collapsed && (
                    <DashboardOutlined
                        style={{ fontSize: '24px', color: token.colorPrimary }}
                    />
                )}
            </div>
            {/* Menu Principal */}
            <Menu
                theme={themeMode}
                mode="inline"
                selectedKeys={selectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                items={menuItems}
                style={{ borderRight: 0 }}
            />
            {/* Ícone Configurações (fixo no fundo) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 20,
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                <SettingOutlined
                    style={{
                        fontSize: '20px',
                        color: token.colorTextTertiary,
                    }}
                />
            </div>
        </Sider>
    );
};

export default Sidebar; 