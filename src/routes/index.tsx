import React from 'react';
import { useLocation, Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Ajustar caminho
import { AppLayout } from '../components/layout/AppLayout'; // Importar AppLayout
import { Typography } from 'antd'; // Importar Typography para 404

// Atualizar importações para usar o padrão de pasta/index.tsx
import VisaoGeral from '../pages/VisaoGeral';
import Carteira from '../pages/contas/Carteira';
import ContasAPagar from '../pages/lancamentos/ContasAPagar';
import Poupanca from '../pages/contas/Poupanca';
import ContasAReceber from '../pages/lancamentos/ContasAReceber';
import ImagensPage from '../pages/Imagens';
import LoginPage from '../pages/Auth/Login';
import RegisterPage from '../pages/Auth/Register';
import AzulelePage from '../pages/Azulele';
import PreferencesPage from '../pages/Settings/Preferences';

// Componente de Rota Protegida
// Responsável por verificar autenticação antes de renderizar o layout principal
export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        // TODO: Idealmente, um spinner/indicador de carregamento mais robusto
        return <div>Verificando autenticação...</div>;
    }

    if (!isAuthenticated) {
        // Redireciona para login, guardando a página que o usuário tentou acessar
        // O `replace` evita que a rota protegida entre no histórico de navegação
        return <Navigate to='/login' state={{ from: location }} replace />;
    }

    // Se autenticado, renderiza o layout principal que contém o <Outlet>
    // O <Outlet> dentro de AppLayout renderizará as rotas filhas (VisaoGeral, Contas, etc.)
    return <AppLayout />;
};

// Componente que define todas as rotas da aplicação
export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Rotas Públicas */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            {/* Rotas Protegidas (usam ProtectedRoute como elemento pai) */}
            {/* ProtectedRoute renderiza AppLayout, que por sua vez contém o <Outlet> */}
            {/* O <Outlet> renderizará a rota filha correspondente (index, contas/*, etc.) */}
            <Route path='/*' element={<ProtectedRoute />}>
                <Route index element={<VisaoGeral />} />
                <Route path='contas'>
                    {/* Exemplo: /contas/carteira */}
                    <Route path='carteira' element={<Carteira />} />
                    <Route path='poupanca' element={<Poupanca />} />
                </Route>
                <Route path='lancamentos'>
                    <Route path='pagar' element={<ContasAPagar />} />
                    <Route path='receber' element={<ContasAReceber />} />
                </Route>
                <Route path='imagens' element={<ImagensPage />} />
                <Route path='azulele' element={<AzulelePage />} />
                <Route path='preferences' element={<PreferencesPage />} />

                {/* Rota 404 - Captura qualquer rota não definida dentro de /* */}
                <Route
                    path='*'
                    element={ (
                        <div style={{ padding: 24, textAlign: 'center' }}>
                            <Typography.Title level={2}>
                                404 - Página Não Encontrada
                            </Typography.Title>
                        </div>
                    )}
                />
            </Route>
        </Routes>
    );
}; 