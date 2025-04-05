import React, {
    useMemo,
} from 'react';
// Remover imports de react-router-dom não utilizados aqui
// import {
//     Routes,
//     Route,
//     useLocation,
//     Navigate,
// } from 'react-router-dom';
import {
    ConfigProvider,
    // Remover Typography não utilizado
    // Typography,
} from 'antd';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { FontSizeProvider, useFontSize } from './contexts/FontSizeContext';
import { AuthProvider /* Remover useAuth daqui se não for usado */ } from './contexts/AuthContext';
import { createThemeConfig } from './theme/themeConfig';
// Remover import de AppLayout se não for usado diretamente aqui
// import { AppLayout } from './components/layout/AppLayout';
// Remover imports de páginas
// import VisaoGeral from './pages/VisaoGeral';
// ... etc ...
import { darkPalette, lightPalette } from './assets/palette';
// Importar o componente de rotas
import { AppRoutes } from './routes';

// Componente de Rota Protegida
// REMOVER ProtectedRoute DAQUI

// Componente Principal
function App() {
    const { themeMode } = useTheme();
    const { currentFontSizes } = useFontSize();

    const currentConfig = useMemo(() => {
        const palette = themeMode === 'light' ? lightPalette : darkPalette;
        return createThemeConfig(palette, currentFontSizes);
    }, [themeMode, currentFontSizes]);

    return (
        <ConfigProvider theme={currentConfig}>
            <AuthProviderWrapper>
                {/* Renderizar o componente de rotas importado */}
                <AppRoutes />
            </AuthProviderWrapper>
        </ConfigProvider>
    );
}

// Wrapper que provê TODOS os contextos
const AppWrapper: React.FC = () => {
    return (
        <FontSizeProvider>
            <ThemeProvider>
                {/* AuthProviderWrapper continua provendo AuthProvider */}
                <AuthProviderWrapper>
                    <App />
                </AuthProviderWrapper>
            </ThemeProvider>
        </FontSizeProvider>
    );
};

// Wrapper necessário para AuthProvider (Router)
const AuthProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // AuthProvider agora é usado apenas aqui
    return <AuthProvider>{children}</AuthProvider>;
};

export default AppWrapper;
