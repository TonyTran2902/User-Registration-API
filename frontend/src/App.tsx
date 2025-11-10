import { ReactNode } from 'react';
import { Link as RouterLink, Route, Routes, BrowserRouter } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  Spacer,
  useColorMode,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const background = useColorModeValue('gray.50', 'gray.900');
  const backgroundAccent = useColorModeValue(
    'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.18), transparent 55%)',
    'radial-gradient(circle at 20% 20%, rgba(45, 212, 191, 0.25), transparent 55%)',
  );

  return (
    <BrowserRouter>
      <Flex
        direction="column"
        minH="100vh"
        bg={background}
        bgImage={backgroundAccent}
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        <Header />
        <Box flex="1" py={{ base: 8, md: 12 }}>
          <Routes>
            <Route
              path="/"
              element={
                <PageContainer maxW="6xl">
                  <HomePage />
                </PageContainer>
              }
            />
            <Route
              path="/login"
              element={
                <PageContainer maxW="lg">
                  <LoginPage />
                </PageContainer>
              }
            />
            <Route
              path="/register"
              element={
                <PageContainer maxW="lg">
                  <RegisterPage />
                </PageContainer>
              }
            />
          </Routes>
        </Box>
        <Footer />
      </Flex>
    </BrowserRouter>
  );
};

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const headerBg = useColorModeValue('whiteAlpha.900', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="header"
      borderBottomWidth="1px"
      borderColor={borderColor}
      bg={headerBg}
      backdropFilter="blur(12px)"
      position="sticky"
      top="0"
      zIndex="docked"
    >
      <Container maxW="6xl">
        <Flex align="center" py={4} gap={6}>
          <Box>
            <Heading size="md" color="teal.500">
              AWAD Users
            </Heading>
            <Box fontSize="sm" color="muted">
              Secure onboarding portal
            </Box>
          </Box>
          <Spacer />
          <HStack spacing={{ base: 3, md: 6 }} flexWrap="wrap" justify="flex-end">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Sign Up</NavLink>
          </HStack>
          <Button as={RouterLink} to="/register" size="sm" colorScheme="teal" variant="solid">
            Get started
          </Button>
          <IconButton
            ml={4}
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Container>
    </Box>
  );
};

const Footer = () => (
  <Box
    as="footer"
    borderTopWidth="1px"
    borderColor={useColorModeValue('gray.200', 'gray.700')}
    bg={useColorModeValue('white', 'gray.900')}
    py={8}
  >
    <Container maxW="6xl">
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'flex-start', md: 'center' }}
        gap={4}
      >
        <Box fontSize="sm" color="muted">
          © {new Date().getFullYear()} AWAD User Registration Demo. Built with NestJS & React.
        </Box>
        <HStack spacing={6} fontSize="sm">
          <Link href="https://nestjs.com" isExternal color="teal.400">
            NestJS Docs
          </Link>
          <Link href="https://react.dev" isExternal color="teal.400">
            React Docs
          </Link>
          <Link href="https://chakra-ui.com" isExternal color="teal.400">
            Chakra UI
          </Link>
        </HStack>
      </Flex>
    </Container>
  </Box>
);

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
};

type PageContainerProps = {
  children: ReactNode;
  maxW?: string | string[];
};

const PageContainer = ({ children, maxW = '6xl' }: PageContainerProps) => (
  <Container maxW={maxW}>{children}</Container>
);

const NavLink = ({ to, children }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const activeColor = useColorModeValue('teal.600', 'teal.300');
  const inactiveColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Link
      as={RouterLink}
      to={to}
      fontWeight={isActive ? 'semibold' : 'medium'}
      color={isActive ? activeColor : inactiveColor}
      position="relative"
      _hover={{ textDecoration: 'none', color: activeColor }}
      _focusVisible={{ boxShadow: 'outline' }}
      transition="color 0.2s ease"
      _after={{
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: '-6px',
        width: '100%',
        height: '2px',
        borderRadius: 'full',
        bg: activeColor,
        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'center',
        transition: 'transform 0.2s ease',
      }}
    >
      {children}
    </Link>
  );
};

export default App;
