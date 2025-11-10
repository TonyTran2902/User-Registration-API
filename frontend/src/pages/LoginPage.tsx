import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setStatus('idle');
    await new Promise((resolve) => setTimeout(resolve, 750));
    setStatus('success');
    reset(values);
  };

  const tipBg = useColorModeValue('teal.50', 'rgba(45, 212, 191, 0.1)');

  return (
    <Stack spacing={6}>
      <Box layerStyle="card" p={{ base: 6, md: 10 }}>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading size="lg">Welcome back</Heading>
            <Text color="muted">Enter your credentials to access the AWAD workspace.</Text>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={4}>
              <FormControl isInvalid={Boolean(errors.email)}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane.doe@example.com"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                />
                <FormHelperText>Use the same email you used during registration.</FormHelperText>
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.password)}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                  <InputRightElement>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
              </FormControl>

              <HStack justify="space-between" align="center">
                <Checkbox defaultChecked>Remember device</Checkbox>
                <Link color="teal.500" fontSize="sm">Forgot password?</Link>
              </HStack>

              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Log in
              </Button>
            </Stack>
          </form>
          <Box fontSize="sm" color="muted">
            Need an account?{' '}
            <Link as={RouterLink} to="/register" color="teal.500" fontWeight="semibold">
              Create one here
            </Link>
            .
          </Box>
          {status === 'success' && (
            <Alert status="success" rounded="md">
              <AlertIcon />
              <Stack spacing={0}>
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>You are now logged in (simulation).</AlertDescription>
              </Stack>
            </Alert>
          )}
        </Stack>
      </Box>
      <Box borderRadius="lg" borderWidth="1px" borderColor="borderSubtle" p={5} bg={tipBg}>
        <Text fontWeight="medium">Tip</Text>
        <Text color="muted">
          Bookmark this page or enable two-factor authentication from your profile to keep your
          workspace protected.
        </Text>
      </Box>
    </Stack>
  );
};

export default LoginPage;
