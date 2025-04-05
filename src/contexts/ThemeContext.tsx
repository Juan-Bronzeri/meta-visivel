import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    ReactNode,
} from 'react';

// 1. Definir o Tipo do Contexto
type ThemeMode = 'light' | 'dark';
type ThemeContextType = {
    themeMode: ThemeMode;
    toggleTheme: () => void;
};

// 2. Criar o Contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Criar o Hook de Acesso Fácil
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
    }
    return context;
};

// 4. Criar o Provedor do Contexto
interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // Lógica de estado movida de AppWithThemeState
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        // Tenta ler do localStorage ou usa 'light' como padrão
        return (
            (localStorage.getItem('themeMode') as ThemeMode) || 'light'
        );
    });

    const toggleTheme = () => {
        setThemeMode((prevMode) => {
            const newTheme = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newTheme); // Salva a preferência
            return newTheme;
        });
    };

    // Memoizar o valor do contexto para evitar recriações desnecessárias
    const value = useMemo(
        () => ({ themeMode, toggleTheme }),
        [themeMode]
    );

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}; 