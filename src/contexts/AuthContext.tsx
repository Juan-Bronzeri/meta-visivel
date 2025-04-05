import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    ReactNode,
} from 'react';
// Remover useNavigate
// import { useNavigate } from 'react-router-dom';
import { checkAuthStatus, logoutUser } from '../services/authService'; // Ajustar caminho relativo

// 1. Definir Tipo do Contexto
type AuthContextType = {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
    isLoading: boolean;
};

// 2. Criar o Contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Criar Hook de Acesso
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

// 4. Criar o Provedor
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Verifica o token com o backend ao carregar
    useEffect(() => {
        let isMounted = true; // Flag para evitar updates em componente desmontado
        const verifyToken = async () => {
            setIsLoading(true); // Começa a carregar
            const token = localStorage.getItem('token');
            let authenticated = false;
            if (token) {
                try {
                    console.log('Verificando token com o backend...');
                    const status = await checkAuthStatus(token);
                    if (status.isAuthenticated) {
                        console.log('Token válido.');
                        authenticated = true;
                    } else {
                        console.log('Token inválido ou expirado pelo backend.');
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error('Erro ao verificar token:', error);
                    localStorage.removeItem('token');
                }
            }

            if (isMounted) { // Só atualiza o estado se o componente ainda estiver montado
                setIsAuthenticated(authenticated);
                setIsLoading(false); // Termina de carregar
                console.log(`Autenticação verificada. Status: ${authenticated}`);
            }
        };

        verifyToken();

        return () => {
            isMounted = false; // Cleanup: marca como desmontado
        };
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        setIsLoading(false); // Garante que loading seja false após login
        console.log('Usuário logado, token salvo.');
    };

    const logout = async () => {
        console.log('Iniciando logout...');
        try {
            await logoutUser(); // Notifica o backend
        } catch (error) {
            console.error('Erro ao notificar backend sobre logout:', error);
        }
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setIsLoading(false);
        console.log('Usuário deslogado, token removido.');
        // A navegação pode ser feita no componente que chama logout, se necessário
        // navigate('/login'); // Removido para maior flexibilidade
    };

    // Memoizar valor do contexto
    const value = useMemo(
        () => ({ isAuthenticated, login, logout, isLoading }),
        [isAuthenticated, isLoading] // Apenas dependências que causam re-renderização do Provider
    );

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}; 