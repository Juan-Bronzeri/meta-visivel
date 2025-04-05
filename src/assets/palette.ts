// src/assets/palette.ts

interface ColorPalette {
  primary: string;
  primaryHover: string;
  primaryActive: string;

  background: string;    // Fundo principal do layout
  container: string;     // Fundo de Cards, Popovers, etc.
  containerLight: string; // Variação um pouco mais clara (ou igual a container)

  textPrimary: string;   // Texto principal
  textSecondary: string; // Texto secundário
  textTertiary: string;  // Texto terciário (placeholder, etc)
  textQuaternary: string; // Texto ainda mais sutil
  textOnPrimary: string; // Texto sobre fundo primário (ex: botão)

  border: string;        // Borda principal
  borderSecondary: string;// Borda mais sutil (ex: divisores internos)

  success: string;
  error: string;
  warning: string;
  info: string;          // Geralmente igual ao primário
}

export const lightPalette: ColorPalette = {
  primary: '#66bb6a',        // Verde Médio
  primaryHover: '#57a95d',   // Tom mais escuro
  primaryActive: '#479750',  // Tom ainda mais escuro

  background: '#f8f9fa',     // Cinza muito claro / Off-white
  container: '#ffffff',     // Branco
  containerLight: '#ffffff',

  textPrimary: '#212121',    // Cinza bem escuro (quase preto)
  textSecondary: '#5f6368',  // Cinza médio
  textTertiary: '#757575',   // Cinza mais claro
  textQuaternary: '#bdbdbd', // Cinza muito claro
  textOnPrimary: '#ffffff',   // Branco

  border: '#e0e0e0',        // Cinza claro para bordas
  borderSecondary: '#eeeeee',// Cinza muito claro (divisores)

  success: '#388e3c',        // Verde escuro para sucesso
  error: '#d32f2f',        // Vermelho padrão
  warning: '#f57c00',       // Laranja padrão
  info: '#66bb6a',           // Igual ao primário
};

export const darkPalette: ColorPalette = {
  primary: '#66bb6a',        // Mesmo verde primário
  primaryHover: '#75c77b',   // Tom mais claro para hover no escuro
  primaryActive: '#81c784',  // Tom ainda mais claro

  background: '#121212',     // Preto/Cinza muito escuro
  container: '#1e1e1e',     // Cinza escuro para cards
  containerLight: '#2a2a2a', // Variação sutil para containers

  textPrimary: 'rgba(255, 255, 255, 0.92)', // Branco um pouco mais opaco
  textSecondary: 'rgba(255, 255, 255, 0.65)',
  textTertiary: 'rgba(255, 255, 255, 0.45)',
  textQuaternary: 'rgba(255, 255, 255, 0.30)', // Ajustar se necessário também
  textOnPrimary: '#ffffff',

  border: '#424242',        // Cinza médio-escuro para bordas
  borderSecondary: '#303030',// Cinza escuro (divisores)

  success: '#81c784',        // Verde mais claro para sucesso no escuro
  error: '#ef5350',        // Vermelho mais claro
  warning: '#ffa726',       // Laranja mais claro
  info: '#66bb6a',           // Igual ao primário
}; 