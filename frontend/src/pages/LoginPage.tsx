import { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
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

  return (
    <Box bg="white" rounded="lg" shadow="sm" p={{ base: 6, md: 10 }}>
      <Stack spacing={6}>
        <Heading size="lg">Log in</Heading>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={4}>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="jane.doe@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
              Log in
            </Button>
          </Stack>
        </form>
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
  );
};

export default LoginPage;
