import { theme, ThemeConfig } from 'antd';
import { lightPalette } from '../assets/palette';
import { largeFontSizes, normalFontSizes } from '../assets/fontSizes';

// Tipo para garantir que fontSizes seja um dos tipos esperados
type FontSizesType = typeof normalFontSizes | typeof largeFontSizes;

// Função para criar a configuração do tema Ant Design
export const createThemeConfig = (
    palette: typeof lightPalette, // O tipo já infere light ou dark
    fontSizes: FontSizesType
): ThemeConfig => ({
    algorithm:
        palette === lightPalette ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: {
        colorPrimary: palette.primary,
        colorBgLayout: palette.background,
        colorBgContainer: palette.container,
        colorTextBase: palette.textPrimary,
        colorTextSecondary: palette.textSecondary,
        colorTextTertiary: palette.textTertiary,
        colorTextQuaternary: palette.textQuaternary,
        colorBorder: palette.border,
        colorBorderSecondary: palette.borderSecondary,
        colorInfo: palette.info,
        colorError: palette.error,
        colorSuccess: palette.success,
        colorWarning: palette.warning,
        borderRadius: 6,
        fontSize: fontSizes.fontSizeBase, // Usar tamanho de fonte do objeto passado
        // Outros tokens de tamanho de fonte podem ser mapeados aqui se necessário
    },
    components: {
        Layout: {
            headerPadding: '0 24px',
            headerBg: palette.container,
            siderBg: 'transparent', // Já definido no Sidebar
        },
        Card: {
            colorBorderSecondary: palette.borderSecondary,
        },
        Menu: {
            colorItemBg: 'transparent',
            colorSubItemBg: 'transparent',
            colorItemBgHover:
                palette === lightPalette
                    ? 'rgba(102, 187, 106, 0.08)' // Verde claro com transparência
                    : 'rgba(102, 187, 106, 0.15)', // Verde mais visível no escuro
            colorItemTextHover: palette.primary, // Texto do item com hover na cor primária
            colorItemTextSelected: palette.textOnPrimary, // Texto selecionado (branco/preto)
            colorItemBgSelected: palette.primary, // Fundo selecionado na cor primária
            // Ajustar tamanhos de fonte do menu se necessário
            fontSize: fontSizes.fontSizeBase,
            itemMarginInline: 8,
        },
        Button: {
            colorPrimary: palette.primary,
            colorPrimaryHover: palette.primaryHover,
            colorPrimaryActive: palette.primaryActive,
            // Ajustar tamanho da fonte do botão
            fontSize: fontSizes.fontSizeBase,
        },
        Switch: {
            handleBg: palette.container,
            colorTextQuaternary: palette.textQuaternary,
            colorTextTertiary: palette.textTertiary,
            colorFillQuaternary: palette.primaryActive, // Cor do fundo desligado
            colorPrimary: palette.primary,
            colorPrimaryHover: palette.primaryHover,
            handleSize: fontSizes.fontSizeBase + 4,
            trackPadding: 2,
            // Ajustar altura/min-width se necessário
        },

        // Outros componentes podem ser customizados aqui (Input, Select, Table...)
    },
});
