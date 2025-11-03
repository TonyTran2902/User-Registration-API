import { Link as RouterLink, Route, Routes, BrowserRouter } from 'react-router-dom';
import {
  Box,
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

  return (
    <BrowserRouter>
      <Flex direction="column" minH="100vh" bg={background}>
        <Header />
        <Box flex="1" py={{ base: 8, md: 12 }}>
          <Container maxW="lg">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Container>
        </Box>
        <Footer />
      </Flex>
    </BrowserRouter>
  );
};

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const headerBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box borderBottomWidth="1px" borderColor={borderColor} bg={headerBg}>
      <Container maxW="6xl">
        <Flex align="center" py={4}>
          <Heading size="md" color="teal.500">
            AWAD Users
          </Heading>
          <Spacer />
          <HStack spacing={6}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Sign Up</NavLink>
          </HStack>
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
    bg={useColorModeValue('white', 'gray.800')}
    py={4}
  >
    <Container maxW="6xl">
      <Flex justify="space-between" align="center">
        <Box fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>
          © {new Date().getFullYear()} AWAD User Registration Demo
        </Box>
        <HStack spacing={4} fontSize="sm">
          <Link href="https://nestjs.com" isExternal color="teal.400">
            NestJS
          </Link>
          <Link href="https://react.dev" isExternal color="teal.400">
            React
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

const NavLink = ({ to, children }: NavLinkProps) => (
  <Link
    as={RouterLink}
    to={to}
    fontWeight="medium"
    color={useColorModeValue('gray.600', 'gray.300')}
    _hover={{ textDecoration: 'none', color: 'teal.400' }}
  >
    {children}
  </Link>
);

export default App;
