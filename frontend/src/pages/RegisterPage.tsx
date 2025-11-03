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
  Text,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerUser } from '../api/user';
import { isAxiosError } from 'axios';

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/\d/, 'Password must contain at least one number'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <Box bg="white" rounded="lg" shadow="sm" p={{ base: 6, md: 10 }}>
      <Stack spacing={6}>
        <Heading size="lg">Create your account</Heading>
        <Text color="gray.600">
          Enter your email and choose a strong password to create an account. We&apos;ll never share
          your details with anyone else.
        </Text>
        <form onSubmit={onSubmit} noValidate>
          <Stack spacing={4}>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                autoComplete="email"
                {...register('email')}
              />
              <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                {...register('password')}
              />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="teal" isLoading={mutation.isPending}>
              Sign up
            </Button>
          </Stack>
        </form>
        {mutation.isSuccess && mutation.data && (
          <Alert status="success" rounded="md">
            <AlertIcon />
            <Stack spacing={0}>
              <AlertTitle>Registration successful!</AlertTitle>
              <AlertDescription>
                Welcome {mutation.data.user.email}. You can now proceed to the login page.
              </AlertDescription>
            </Stack>
          </Alert>
        )}
        {mutation.isError && (
          <Alert status="error" rounded="md">
            <AlertIcon />
            <Stack spacing={0}>
              <AlertTitle>Registration failed</AlertTitle>
              <AlertDescription>
                {isAxiosError(mutation.error)
                  ? (mutation.error.response?.data as { message?: string } | undefined)?.message ??
                    'Server rejected the request.'
                  : (mutation.error as Error)?.message ?? 'An unexpected error occurred.'}
              </AlertDescription>
            </Stack>
          </Alert>
        )}
      </Stack>
    </Box>
  );
};

export default RegisterPage;
