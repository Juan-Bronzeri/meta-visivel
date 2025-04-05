import React, { useState, createContext, useContext, useMemo, useEffect } from 'react'; // Adicionar hooks de contexto e useMemo
import { Routes, Route, Outlet, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import {
    ConfigProvider, // Para aplicar o tema
    theme, // Para acessar algoritmos e tokens padrão
    Layout,
    Menu,
    Typography,
    Grid, // Para layout responsivo
    Switch, // Importar Switch para o toggle
    Space, // Mantido pois será usado agora
    Avatar, // Adicionado
    Popover, // Adicionado
} from 'antd';
import type { MenuProps } from 'antd'; // Importar tipo para handler
import {
    DashboardOutlined, // Ícone Visão Geral
    BankOutlined, // Ícone Contas (genérico)
    WalletOutlined, // Ícone Carteira
    SafetyOutlined, // Ícone Poupança
    ScheduleOutlined, // Ícone Lançamentos
    ArrowUpOutlined, // Ícone Contas a Receber
    ArrowDownOutlined, // Ícone Contas a Pagar
    PictureOutlined, // Ícone para Imagens
    SlackOutlined, // Ícone para Azulele
    SettingOutlined, // Ícone Configurações
    SunOutlined, // Ícone para tema claro
    MoonOutlined, // Ícone para tema escuro
    UserOutlined, // Ícone para Avatar e Preferências
    LogoutOutlined, // Ícone para Sair
} from '@ant-design/icons';
import { checkAuthStatus, logoutUser } from './services/authService'; // Importar serviços

import VisaoGeral from './pages/VisaoGeral';
import Carteira from './pages/contas/Carteira';

import ContasAPagar from './pages/lancamentos/ContasAPagar';
import Poupanca from './pages/contas/Poupanca';
import ContasAReceber from './pages/lancamentos/ContasAReceber';
import ImagensPage from './pages/ImagensPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // Importar RegisterPage
import AzulelePage from './pages/AzulelePage';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

// Função para gerar itens do Menu AntD
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return { key, icon, children, label, type } as MenuItem;
}

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
    getItem(<Link to='/'>Visão Geral</Link>, '/', <DashboardOutlined />),
    getItem('Contas', '/contas', <BankOutlined />, [
        getItem(
            <Link to='/contas/carteira'>Carteira</Link>,
            '/contas/carteira',
            <WalletOutlined />
        ),
        getItem(
            <Link to='/contas/poupanca'>Poupança</Link>,
            '/contas/poupanca',
            <SafetyOutlined />
        ),
    ]),
    getItem('Lançamentos Futuros', '/lancamentos', <ScheduleOutlined />, [
        getItem(
            <Link to='/lancamentos/pagar'>Contas a Pagar</Link>,
            '/lancamentos/pagar',
            <ArrowDownOutlined />
        ),
        getItem(
            <Link to='/lancamentos/receber'>Contas a Receber</Link>,
            '/lancamentos/receber',
            <ArrowUpOutlined />
        ),
    ]),
    getItem(
        <Link to='/imagens'>Imagens</Link>,
        '/imagens',
        <PictureOutlined />
    ),
    getItem(
        <Link to='/azulele'>Azulele</Link>,
        '/azulele',
        <SlackOutlined />
    ),
];

// ---- Configuração do Tema Claro Customizado (Lilás) ----
const primaryLilac = '#b19cd9'; // Pastel Violet

const lilacThemeConfig = {
    algorithm: theme.defaultAlgorithm,
    token: {
        colorPrimary: primaryLilac,
        colorBgLayout: '#fdfcff', // Fundo geral levemente lilás
        colorTextBase: '#333333',
        colorTextSecondary: '#666666',
        colorTextTertiary: '#999999',
        colorBorder: '#e8e8e8',
        colorBorderSecondary: '#f5f5f5',
        colorInfo: primaryLilac,
        colorError: '#d32f2f',
        colorSuccess: '#2e7d32',
        colorWarning: '#ed6c02',
        // Ajustes finos para componentes se necessário
        borderRadius: 6, // Bordas ligeiramente arredondadas
    },
    components: {
        Layout: {
            headerPadding: '0 24px',
            headerBg: '#ffffff', // Cabeçalho branco
            siderBg: '#ffffff', // Sider branco
        },
        Card: {
            colorBorderSecondary: '#f0f0f0' // Linha interna do card (se aplicável)
        },
        Menu: {
            colorItemBg: 'transparent',
            colorSubItemBg: 'transparent',
            colorItemBgHover: 'rgba(177, 156, 217, 0.08)', // Lilás transparente
            colorItemTextHover: primaryLilac,
            colorItemTextSelected: '#ffffff',
            colorItemBgSelected: primaryLilac,
        },
        Statistic: {
            // Manter padrão claro
        },
        Button: {
           // Para botões primários seguirem o lilás
           colorPrimary: primaryLilac,
           colorPrimaryHover: '#9a82c7', // Um tom ligeiramente mais escuro para hover
           colorPrimaryActive: '#836aaf', // Um tom ainda mais escuro para active
        },
    },
};

// ---- Configuração do Tema Escuro Customizado (Lilás) ----
const darkThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: primaryLilac, // Manter o lilás primário
        colorBgLayout: '#141414', // Fundo bem escuro
        colorBgContainer: '#1d1d1d', // Fundo de containers (cards, etc)
        colorTextBase: 'rgba(255, 255, 255, 0.85)', // Texto claro principal
        colorTextSecondary: 'rgba(255, 255, 255, 0.65)',
        colorTextTertiary: 'rgba(255, 255, 255, 0.45)',
        colorBorder: '#424242',
        colorBorderSecondary: '#303030',
        colorInfo: primaryLilac,
        colorError: '#f5222d',
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        borderRadius: 6,
    },
    components: {
        Layout: {
             headerPadding: '0 24px',
             headerBg: '#1d1d1d', // Header escuro
             siderBg: '#1d1d1d', // Sider escuro
        },
        Card: {
            colorBorderSecondary: '#303030'
        },
        Menu: {
            colorItemBg: 'transparent',
            colorSubItemBg: 'transparent',
            colorItemBgHover: 'rgba(177, 156, 217, 0.15)', // Lilás mais visível no escuro
            colorItemTextHover: primaryLilac,
            colorItemTextSelected: '#ffffff',
            colorItemBgSelected: primaryLilac,
        },
        Statistic: {},
        Button: {
           colorPrimary: primaryLilac,
           colorPrimaryHover: '#9a82c7',
           colorPrimaryActive: '#836aaf',
        },
        // Ajustar Switch para ter cores claras
        Switch: {
            colorTextQuaternary: 'rgba(255, 255, 255, 0.25)',
            colorTextTertiary: 'rgba(255, 255, 255, 0.45)'
        }
    },
};
// ---- Fim da Configuração do Tema ----

// --- Contexto para o Tema ---
type ThemeContextType = {
    themeMode: 'light' | 'dark';
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
// --- Fim do Contexto ---

// Componente ThemeToggle (colocado aqui temporariamente para simplicidade)
const ThemeToggle: React.FC = () => {
    const { themeMode, toggleTheme } = useTheme();
    return (
        <Switch
            checkedChildren={<SunOutlined />} // Ícone para Light
            unCheckedChildren={<MoonOutlined />} // Ícone para Dark
            checked={themeMode === 'light'}
            onChange={toggleTheme}
        />
    );
};

// --- Contexto para Autenticação ---
type AuthContextType = {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Verifica o token com o backend ao carregar
    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    console.log('Verificando token com o backend...');
                    const status = await checkAuthStatus(token);
                    if (status.isAuthenticated) {
                        console.log('Token válido.');
                        setIsAuthenticated(true);
                    } else {
                        console.log('Token inválido ou expirado pelo backend.');
                        localStorage.removeItem('token'); // Limpa token inválido
                        setIsAuthenticated(false);
                    }
                } catch (error) {
                    console.error('Erro ao verificar token:', error);
                    localStorage.removeItem('token'); // Limpa em caso de erro na API
                    setIsAuthenticated(false);
                }
            } else {
                console.log('Nenhum token encontrado localmente.');
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        };

        verifyToken();
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        console.log('Usuário logado, token salvo.');
    };

    const logout = async () => { // Tornar async para chamar API
        console.log('Iniciando logout...');
        await logoutUser(); // Notifica o backend (opcional, mas boa prática)
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        console.log('Usuário deslogado, token removido.');
        navigate('/login');
    };

    const value = useMemo(() => ({ isAuthenticated, login, logout, isLoading }), [isAuthenticated, isLoading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
// --- Fim do Contexto de Autenticação ---

// Componente de Rota Protegida
const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        // TODO: Mostrar um spinner de carregamento global aqui
        return <div>Verificando autenticação...</div>; 
    }

    if (!isAuthenticated) {
        // Redireciona para login, guardando a página que o usuário tentou acessar
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <AppLayout />; // Renderiza o layout principal se autenticado
};

// Componente de Layout Principal com AntD
function AppLayout() {
    const location = useLocation();
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);
    const { themeMode } = useTheme(); // Obter modo do contexto
    const { logout } = useAuth(); // Obter função de logout do contexto

    const currentTheme = themeMode === 'light' ? lilacThemeConfig : darkThemeConfig;

    // Handler para o menu do usuário (placeholder)
    const handleUserMenuClick: MenuProps['onClick'] = (e) => {
        console.log('User menu click: ', e.key);
        if (e.key === 'logout') {
            logout(); // Chamar logout do contexto
        } else if (e.key === 'settings') {
            // Navegar para /settings (exemplo)
            // navigate('/settings');
        } else if (e.key === 'preferences') {
             // Navegar para /preferences (exemplo)
             // navigate('/preferences');
        }
    };

    // Conteúdo do Popover (Menu do Usuário)
    const userMenuContent = (
        <Menu
            onClick={handleUserMenuClick}
            items={[
                getItem('Configurações', 'settings', <SettingOutlined />),
                getItem('Preferências', 'preferences', <UserOutlined />),
                { type: 'divider' }, // Separador
                getItem('Sair', 'logout', <LogoutOutlined />),
            ]}
        />
    );

    const selectedKeys = [location.pathname];
    const defaultOpenKeys = menuItems
        .filter(
            (item) =>
                item?.key && location.pathname.startsWith(item.key as string)
        )
        .map((item) => item?.key as string);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                breakpoint='lg'
                collapsedWidth={screens.lg ? 80 : 0}
                theme={themeMode} // Usar themeMode para definir tema do Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    borderRight: `1px solid ${currentTheme.token.colorBorder}`,
                }}
            >
                {/* Título/Logo no topo do Sider */}
                <div
                    style={{
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'transparent',
                        marginBottom: '10px',
                        // Remover borderBottom daqui, Sider já tem borda direita
                    }}
                >
                    {!collapsed && (
                        <Title
                            level={4}
                            style={{ color: currentTheme.token.colorPrimary, margin: 0 }}
                        >
                            Orçamento
                        </Title>
                    )}
                    {collapsed && (
                        <DashboardOutlined
                            style={{ fontSize: '24px', color: currentTheme.token.colorPrimary }}
                        />
                    )}
                </div>
                <Menu
                    theme={themeMode} // Usar themeMode para definir tema do Menu
                    mode="inline"
                    selectedKeys={selectedKeys}
                    defaultOpenKeys={defaultOpenKeys}
                    items={menuItems}
                    style={{ borderRight: 0 }}
                />
                 {/* Icone Configurações */}
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
                            color: currentTheme.token.colorTextTertiary,
                        }}
                    />
                </div>
            </Sider>
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
                        borderBottom: `1px solid ${currentTheme.token.colorBorder}`,
                        background: currentTheme.components.Layout.headerBg
                    }}
                >
                    <Title level={3} style={{ margin: 0, color: currentTheme.token.colorTextBase }}>
                        Orçamento Pessoal
                    </Title>
                    <Space align="center"> {/* Agrupa Toggle e Avatar */} 
                        <ThemeToggle />
                        <Popover
                            placement="bottomRight"
                            content={userMenuContent}
                            trigger="click"
                        >
                            {/* Usar Avatar com ícone padrão */}
                            <Avatar style={{ cursor: 'pointer' }} icon={<UserOutlined />} />
                        </Popover>
                    </Space>
                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                     {/* Background do Content vem do colorBgLayout */}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}

// Componente Principal com Rotas e Provedor de Tema
function App() {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light'); // Estado do tema

    const toggleTheme = () => {
        setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    // Usar useMemo para evitar recriar o objeto de contexto em cada render
    const themeContextValue = useMemo(() => ({ themeMode, toggleTheme }), [themeMode]);

    // Determina qual configuração de tema usar
    const currentConfig = themeMode === 'light' ? lilacThemeConfig : darkThemeConfig;

  return (
        <ThemeContext.Provider value={themeContextValue}>
            {/* ConfigProvider aplica o tema ATUAL */}
            <ConfigProvider theme={currentConfig}>
                {/* AuthProvider precisa do Router para usar navigate */}
                {/* Envolver AuthProvider DENTRO de um Router implícito ou explícito */}
                {/* Como estamos usando Routes, vamos precisar de um wrapper */}
                <AuthProviderWrapper>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} /> {/* Nova Rota */}
                        {/* Rota protegida para o layout principal */}
                        <Route path="/*" element={<ProtectedRoute />}>
                            {/* Rotas filhas são definidas dentro de ProtectedRoute -> AppLayout -> Outlet */}
                            <Route index element={<VisaoGeral />} />
                            <Route path='contas'>
                                <Route path='carteira' element={<Carteira />} />
                                <Route path='poupanca' element={<Poupanca />} />
                            </Route>
                            <Route path='lancamentos'>
                                <Route path='pagar' element={<ContasAPagar />} />
                                <Route path='receber' element={<ContasAReceber />} />
                            </Route>
                            <Route path='imagens' element={<ImagensPage />} />
                            <Route path='azulele' element={<AzulelePage />} />
                            <Route
                                path='*' // Captura qualquer rota não definida DENTRO do layout protegido
                                element={
                                    <div style={{ padding: 24, textAlign: 'center' }}>
                                        <Title level={2}>
                                            404 - Página Não Encontrada
                                        </Title>
                                    </div>
                                }
                            />
                         </Route>
                    </Routes>
                </AuthProviderWrapper>
            </ConfigProvider>
        </ThemeContext.Provider>
    );
}

// Wrapper necessário porque AuthProvider usa useNavigate, que requer estar dentro de um Router
const AuthProviderWrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
     // Como App está fora do BrowserRouter do main.tsx, precisamos adicionar um aqui
     // Se main.tsx já tiver BrowserRouter, este não é necessário
     // ASSUMINDO que main.tsx NÃO tem BrowserRouter:
     // import { BrowserRouter } from 'react-router-dom';
     // return <BrowserRouter><AuthProvider>{children}</AuthProvider></BrowserRouter>;

     // ASSUMINDO que main.tsx JÁ TEM BrowserRouter:
     return <AuthProvider>{children}</AuthProvider>;
}

export default App;
