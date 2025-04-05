// src/assets/fontSizes.ts

interface FontSizeSet {
  fontSizeBase: number; // Em pixels para AntD token
  textSm: string;       // Ex: 0.875rem
  textBase: string;     // Ex: 1rem (relativo ao root)
  textLg: string;       // Ex: 1.125rem
  textXl: string;       // Ex: 1.25rem

  // Tamanhos de Título (exemplo)
  h1: string;           // Ex: 2.5rem
  h2: string;           // Ex: 2rem
  h3: string;           // Ex: 1.75rem
  h4: string;           // Ex: 1.5rem
  h5: string;           // Ex: 1.25rem
  h6: string;           // Ex: 1rem
}

// Tema "Normal" / "Agradável"
export const normalFontSizes: FontSizeSet = {
  fontSizeBase: 14,      // AntD base
  textSm: '0.875rem',   // 14px se root for 16px
  textBase: '1rem',       // 16px
  textLg: '1.125rem',    // 18px
  textXl: '1.25rem',     // 20px
  h1: '2.125rem',  // ~34px
  h2: '1.75rem',   // 28px
  h3: '1.5rem',    // 24px
  h4: '1.25rem',   // 20px
  h5: '1.125rem',  // 18px
  h6: '1rem',      // 16px
};

// Tema "Maior"
export const largeFontSizes: FontSizeSet = {
  fontSizeBase: 16,      // AntD base maior
  textSm: '1rem',         // 16px se root for 16px
  textBase: '1.125rem',  // 18px
  textLg: '1.25rem',      // 20px
  textXl: '1.375rem',     // 22px
  h1: '2.5rem',    // 40px
  h2: '2rem',      // 32px
  h3: '1.75rem',   // 28px
  h4: '1.5rem',    // 24px
  h5: '1.25rem',   // 20px
  h6: '1.125rem',  // 18px
}; 