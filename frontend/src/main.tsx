import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, ColorModeScript, extendTheme, ThemeConfig } from '@chakra-ui/react';
import type { StyleFunctionProps } from '@chakra-ui/styled-system';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mode } from '@chakra-ui/theme-tools';
import App from './App';

const queryClient = new QueryClient();

const colorModeConfig: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config: colorModeConfig,
  fonts: {
    heading: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  colors: {
    brand: {
      50: '#e6fffb',
      100: '#b2f5ea',
      200: '#81e6d9',
      300: '#4fd1c5',
      400: '#38b2ac',
      500: '#319795',
      600: '#2c7a7b',
      700: '#285e61',
      800: '#234e52',
      900: '#1d4044',
    },
  },
  semanticTokens: {
    colors: {
      muted: { default: 'gray.600', _dark: 'gray.300' },
      cardBg: { default: 'white', _dark: 'gray.800' },
      borderSubtle: { default: 'gray.200', _dark: 'gray.700' },
    },
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('gray.50', 'gray.900')(props),
        color: mode('gray.800', 'gray.100')(props),
      },
    }),
  },
  components: {
    Container: {
      baseStyle: {
        px: { base: 4, md: 8 },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
    },
  },
  layerStyles: {
    card: {
      bg: 'cardBg',
      borderRadius: '2xl',
      boxShadow: { base: 'sm', md: 'lg' },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
