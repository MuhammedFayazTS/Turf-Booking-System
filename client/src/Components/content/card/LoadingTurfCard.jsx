import React from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Button,
  Skeleton,
} from '@chakra-ui/react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

function LoadingTurfCard() {
  return (
    <Card
      as={motion.div}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'tween' }}
      viewport={{ once: true }}
      maxW="sm"
      minH="400px"
      width="300px"
      overflow="hidden"
    >
      <CardBody p={{ base: 0, md: '18px' }} display="flex" flexDirection="column" height="100%">
        <Skeleton height="200px" width="100%" borderRadius={{ base: 'none', md: 'lg' }} />
        <Stack p={{ md: 0, base: '18px' }} mt="4" spacing="3" flexGrow={1}>
          <div className="flex space-x-2 items-center">
            <Skeleton width="8" height="8" borderRadius="full" />
            <Skeleton width="40px" height="8" />
            <Skeleton width="60px" height="8" />
          </div>
          <Heading size="md">
            <Skeleton height="20px" width="80%" />
          </Heading>
          <Text color="green.600" fontWeight="bold" fontSize="lg">
            <Skeleton height="16px" width="60%" />
          </Text>
          <Text color="gray.600" className="flex items-center gap-1" fontSize="md">
            <MapPinIcon className="h-5 w-5" />
            <Skeleton height="16px" width="40%" />
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button
          variant="solid"
          leftIcon={<CalendarDaysIcon className="h-5 w-5 mr-1" />}
          colorScheme="green"
          isDisabled
        >
          <Skeleton height="16px" width="80%" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default LoadingTurfCard;
