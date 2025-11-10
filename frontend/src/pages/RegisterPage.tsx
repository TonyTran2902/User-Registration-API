import { useMemo, useState } from 'react';
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
  FormHelperText,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Progress,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerUser } from '../api/user';
import { isAxiosError } from 'axios';
import { CheckCircleIcon, ViewIcon, ViewOffIcon, WarningIcon } from '@chakra-ui/icons';

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/\d/, 'Password must contain at least one number'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const passwordChecklist = [
  {
    label: 'At least 8 characters',
    test: (value: string) => value.length >= 8,
  },
  {
    label: 'Includes a letter',
    test: (value: string) => /[A-Za-z]/.test(value),
  },
  {
    label: 'Includes a number',
    test: (value: string) => /\d/.test(value),
  },
];

const getPasswordStrength = (value: string) => {
  if (!value) {
    return { score: 0, label: 'Enter a password', color: 'gray.400', colorScheme: 'gray', percent: 0 };
  }

  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
  if (/\d/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  const labels = ['Needs more work', 'Getting there', 'Strong password', 'Excellent'];
  const colors = ['red.400', 'orange.400', 'teal.400', 'green.400'];
  const colorSchemes = ['red', 'orange', 'teal', 'green'];

  const index = Math.min(score, labels.length - 1);

  return {
    score,
    label: labels[index],
    color: colors[index],
    colorScheme: colorSchemes[index],
    percent: (score / 4) * 100,
  };
};

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const tipBg = useColorModeValue('teal.50', 'rgba(45, 212, 191, 0.08)');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const passwordValue = watch('password');
  const passwordStrength = useMemo(() => getPasswordStrength(passwordValue), [passwordValue]);

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  const checklist = passwordChecklist.map((item) => ({
    ...item,
    met: item.test(passwordValue ?? ''),
  }));

  return (
    <Stack spacing={6}>
      <Box layerStyle="card" p={{ base: 6, md: 10 }}>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading size="lg">Create your account</Heading>
            <Text color="muted">
              Enter your email and choose a strong password to get instant access to the portal.
            </Text>
          </Stack>
          <form onSubmit={onSubmit} noValidate>
            <Stack spacing={5}>
              <FormControl isInvalid={Boolean(errors.email)}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  autoComplete="email"
                  {...register('email')}
                />
                <FormHelperText>This address is used for verification and recovery.</FormHelperText>
                <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={Boolean(errors.password)}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a secure password"
                    autoComplete="new-password"
                    {...register('password')}
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

              <Stack spacing={3}>
                <HStack justify="space-between" fontSize="sm">
                  <Text color="muted">Password strength</Text>
                  <Text color={passwordStrength.color} fontWeight="semibold">
                    {passwordStrength.label}
                  </Text>
                </HStack>
                <Progress
                  borderRadius="full"
                  size="sm"
                  value={passwordStrength.percent}
                  colorScheme={passwordStrength.colorScheme}
                />
                <List spacing={2}>
                  {checklist.map((item) => (
                    <ListItem key={item.label} color={item.met ? 'teal.500' : 'muted'}>
                      <ListIcon
                        as={item.met ? CheckCircleIcon : WarningIcon}
                        color={item.met ? 'teal.400' : 'gray.400'}
                      />
                      {item.label}
                    </ListItem>
                  ))}
                </List>
              </Stack>

              <Button type="submit" colorScheme="teal" size="lg" isLoading={mutation.isPending}>
                Sign up
              </Button>
              <Text fontSize="sm" color="muted">
                By continuing you agree to the usage policy and security guidelines.
              </Text>
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

      <Box borderRadius="lg" borderWidth="1px" borderColor="borderSubtle" p={5} bg={tipBg}>
        <Text fontWeight="medium">Why we ask for this</Text>
        <Text color="muted">
          Your password encrypts access tokens and sensitive workspace content. Strong credentials
          help keep every project secure.
        </Text>
      </Box>
    </Stack>
  );
};

export default RegisterPage;
