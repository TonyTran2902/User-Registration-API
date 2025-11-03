import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => (
  <Box bg="white" rounded="lg" shadow="sm" p={{ base: 6, md: 10 }}>
    <Stack spacing={4}>
      <Heading size="lg">Welcome to the AWAD User Portal</Heading>
      <Text color="gray.600">
        Register for a new account or sign in to access the internal tools. This demo shows a fully
        validated registration flow powered by NestJS and React.
      </Text>
      <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
        <Button as={RouterLink} to="/register" colorScheme="teal">
          Create an account
        </Button>
        <Button as={RouterLink} to="/login" variant="outline" colorScheme="teal">
          Go to login
        </Button>
      </Stack>
    </Stack>
  </Box>
);

export default HomePage;
