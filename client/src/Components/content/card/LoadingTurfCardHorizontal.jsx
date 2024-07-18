import React from 'react';
import { Button, Card, CardBody, CardFooter, Heading, Stack, Text, Skeleton } from '@chakra-ui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

function LoadingTurfCardHorizontal() {
  return (
    <Card
      as={motion.div}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'tween' }}
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      width="100%"
      maxH="350px"
    >
      <Skeleton height={{ base: '200px', sm: 'full' }} width={{ base: '100%', sm: '400px' }} />

      <Stack>
        <CardBody className="flex flex-col space-y-2">
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
      </Stack>
    </Card>
  );
}

export default LoadingTurfCardHorizontal;
