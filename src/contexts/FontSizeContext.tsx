import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    ReactNode,
} from 'react';
import { largeFontSizes, normalFontSizes } from '../assets/fontSizes';

// 1. Definir Tipos
type FontSizeTheme = 'normal' | 'large';
type CurrentFontSizes = typeof normalFontSizes;

type FontSizeContextType = {
    fontSizeTheme: FontSizeTheme;
    toggleFontSizeTheme: () => void;
    currentFontSizes: CurrentFontSizes; // Usar o tipo definido
};

// 2. Criar o Contexto
const FontSizeContext = createContext<FontSizeContextType | undefined>(
    undefined
);

// 3. Criar Hook de Acesso
export const useFontSize = () => {
    const context = useContext(FontSizeContext);
    if (!context) {
        throw new Error(
            'useFontSize deve ser usado dentro de um FontSizeProvider'
        );
    }
    return context;
};

// 4. Criar o Provedor
interface FontSizeProviderProps {
    children: ReactNode;
}

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({
    children,
}) => {
    // Estado para o tema de fonte
    const [fontSizeTheme, setFontSizeTheme] = useState<FontSizeTheme>(() => {
        return (
            (localStorage.getItem('fontSizeTheme') as FontSizeTheme) || 'normal'
        );
    });

    // Função para alternar o tema
    const toggleFontSizeTheme = () => {
        setFontSizeTheme((prevTheme) => {
            const newTheme = prevTheme === 'normal' ? 'large' : 'normal';
            localStorage.setItem('fontSizeTheme', newTheme); // Salvar preferência
            return newTheme;
        });
    };

    // Determinar os tamanhos de fonte atuais com base no tema
    const currentFontSizes: CurrentFontSizes = useMemo(() => {
        return fontSizeTheme === 'normal' ? normalFontSizes : largeFontSizes;
    }, [fontSizeTheme]);

    // Memoizar o valor do contexto
    const value = useMemo(
        () => ({
            fontSizeTheme,
            toggleFontSizeTheme,
            currentFontSizes,
        }),
        [fontSizeTheme, toggleFontSizeTheme, currentFontSizes] // Incluir toggleFontSizeTheme
    );

    return (
        <FontSizeContext.Provider value={value}>
            {children}
        </FontSizeContext.Provider>
    );
};
