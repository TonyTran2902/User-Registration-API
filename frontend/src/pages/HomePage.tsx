import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowForwardIcon, CheckIcon, LockIcon, RepeatIcon, TimeIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import type { ElementType } from 'react';

type Feature = {
  title: string;
  description: string;
  icon: ElementType;
};

const features: Feature[] = [
  {
    title: 'Guided onboarding',
    description: 'Step-by-step validation ensures every required field is collected without friction.',
    icon: CheckIcon,
  },
  {
    title: 'Security-first defaults',
    description: 'Passwords, sessions, and audit logs follow strict internal compliance standards.',
    icon: LockIcon,
  },
  {
    title: 'Real-time insights',
    description: 'Track submissions and approvals in real time with instant notifications.',
    icon: TimeIcon,
  },
];

const checklist = ['SOC2-ready controls', 'Transparent status updates', '1:1 onboarding support'];

const stats = [
  { value: '2 min', label: 'Avg. setup time' },
  { value: '99.9%', label: 'Uptime commitment' },
  { value: '24/7', label: 'Support coverage' },
];

const steps = [
  {
    title: 'Share your details',
    description: 'Provide the essentials so we can create your secure workspace and roles.',
    detail: 'Takes ~2 minutes',
  },
  {
    title: 'Verify email & policy',
    description: 'Confirm your identity and accept the usage policy from any device.',
    detail: 'Instant confirmation',
  },
  {
    title: 'Access dashboards',
    description: 'Log in to manage resources, invite teammates, and review activity.',
    detail: 'Guided tour included',
  },
];

const HomePage = () => {
  const heroBg = useColorModeValue('linear-gradient(135deg, white, teal.50)', 'linear-gradient(135deg, gray.800, gray.900)');
  const accentBorder = useColorModeValue('teal.100', 'teal.500');

  return (
    <Stack spacing={10}>
      <Box layerStyle="card" p={{ base: 6, md: 10 }} bgGradient={heroBg} borderWidth="1px" borderColor={accentBorder}>
        <Stack direction={{ base: 'column', lg: 'row' }} spacing={10} align="center">
          <Stack spacing={6} flex="1">
            <Tag colorScheme="teal" w="fit-content">
              New workspace experience
            </Tag>
            <Heading size="2xl" lineHeight="shorter">
              Welcome to the AWAD User Portal
            </Heading>
            <Text fontSize="lg" color="muted">
              Register a secure account, complete verification, and access your project dashboards
              in minutes. Everything is optimized for clarity, compliance, and speed.
            </Text>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
              <Button
                as={RouterLink}
                to="/register"
                colorScheme="teal"
                size="lg"
                rightIcon={<ArrowForwardIcon />}
              >
                Start registration
              </Button>
              <Button as={RouterLink} to="/login" variant="ghost" size="lg">
                Preview login flow
              </Button>
            </Stack>
            <Wrap spacing={3}>
              {checklist.map((item) => (
                <WrapItem key={item}>
                  <HStack spacing={2} color="muted">
                    <Icon as={CheckIcon} color="teal.400" />
                    <Text fontSize="sm">{item}</Text>
                  </HStack>
                </WrapItem>
              ))}
            </Wrap>
          </Stack>
          <Box
            flex="1"
            borderWidth="1px"
            borderColor="borderSubtle"
            borderRadius="2xl"
            p={6}
            bg="cardBg"
          >
            <Stack spacing={4}>
              <Heading size="md">Live system snapshot</Heading>
              <Text color="muted" fontSize="sm">
                Verified accounts are provisioned every few seconds. Stay updated with a transparent
                timeline.
              </Text>
              <Divider />
              <Stack spacing={4}>
                {stats.map((stat) => (
                  <Box key={stat.label}>
                    <Text fontSize="3xl" fontWeight="bold">
                      {stat.value}
                    </Text>
                    <Text color="muted" fontSize="sm">
                      {stat.label}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        {features.map((feature) => (
          <Box key={feature.title} layerStyle="card" p={6} borderWidth="1px" borderColor="borderSubtle">
            <HStack spacing={3}>
              <Icon as={feature.icon} boxSize={5} color="teal.400" />
              <Heading size="md">{feature.title}</Heading>
            </HStack>
            <Text mt={3} color="muted">
              {feature.description}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box layerStyle="card" p={{ base: 6, md: 10 }} borderWidth="1px" borderColor="borderSubtle">
        <Stack spacing={6}>
          <Heading size="lg">How onboarding works</Heading>
          <Stack spacing={6}>
            {steps.map((step, index) => (
              <HStack key={step.title} align="flex-start" spacing={4}>
                <Box
                  borderRadius="full"
                  borderWidth="2px"
                  borderColor="teal.300"
                  minW="48px"
                  minH="48px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="semibold"
                >
                  {index + 1}
                </Box>
                <VStack align="flex-start" spacing={2}>
                  <Heading size="md">{step.title}</Heading>
                  <Text color="muted">{step.description}</Text>
                  <HStack spacing={1} fontSize="sm" color="teal.500">
                    <Icon as={TimeIcon} />
                    <Text>{step.detail}</Text>
                  </HStack>
                </VStack>
              </HStack>
            ))}
          </Stack>
          <Box
            borderRadius="xl"
            borderWidth="1px"
            borderStyle="dashed"
            borderColor="teal.400"
            p={5}
            bg={useColorModeValue('teal.50', 'teal.900')}
          >
            <HStack spacing={3}>
              <Icon as={RepeatIcon} color="teal.500" />
              <Text fontWeight="medium">
                Need to make changes? You can revisit and update your information anytime before it
                is approved.
              </Text>
            </HStack>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default HomePage;
