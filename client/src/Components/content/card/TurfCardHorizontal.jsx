import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayStarRating from '../../Reviews & Rating/DisplayStarRating';

const defaultImage = 'https://placehold.co/800@3x.png';

function TurfCardHorizontal({ data }) {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/turf/${data._id}`);
  };

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
      <Image
        objectFit="cover"
        width={{ base: '100%', sm: '400px' }}
        height="full"
        src={data.images[0] ? data.images[0] : defaultImage}
        alt={data?.name}
      />

      <Stack>
        <CardBody className="flex flex-col space-y-2">
          <div className="flex space-x-2 items-center">
            {data?.rating?.stars && (
              <div className="bg-amber-500 w-8 text-white p-1.5 rounded-md text-sm font-medium flex justify-center">
                {data?.rating?.stars?.toFixed(1)}
              </div>
            )}
            <DisplayStarRating rating={data?.rating?.stars} />
            <p className="text-gray-600 text-md">{data?.rating?.count || 0} Reviews</p>
          </div>

          <Heading size="md">{data.name}</Heading>

          <Text color="green.600" fontWeight="bold" fontSize="lg">
            ${data.price} / Hour
          </Text>
          <Text color="gray.600" className="flex items-center gap-1" fontSize="md">
            <MapPinIcon className="h-5 w-5" />
            {data.location?.name}
          </Text>
        </CardBody>

        <CardFooter>
          <Button
            onClick={handleBooking}
            variant="solid"
            leftIcon={<CalendarDaysIcon className="h-5 w-5 mr-1" />}
            colorScheme="green"
          >
            Book now
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default TurfCardHorizontal;
