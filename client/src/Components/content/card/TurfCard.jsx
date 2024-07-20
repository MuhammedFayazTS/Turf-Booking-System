import React from 'react';
import { Card, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DisplayStarRating from '../review_and_rating/DisplayStarRating';

const defaultImage = 'https://placehold.co/800@3x.png';

function TurfCard({ data }) {
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
      viewport={{ once: true }}
      maxW="sm"
      minH="400px"
      width="300px"
      overflow="hidden"
    >
      <CardBody p={{ base: 0, md: '18px' }} display="flex" flexDirection="column" height="100%">
        <Image
          src={data.images?.[0] ? data.images[0] : defaultImage}
          alt={data?.name}
          height="200px"
          width="100%"
          objectFit="cover"
          objectPosition="center"
          borderRadius={{ base: 'none', md: 'lg' }}
        />
        <Stack p={{ md: 0, base: '18px' }} mt="4" spacing="3" flexGrow={1}>
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
            ₹{data.price} / Hour
          </Text>
          <Text color="gray.600" className="flex items-center gap-1" fontSize="md">
            <MapPinIcon className="h-5 w-5" />
            {data.location?.name}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button
          variant="solid"
          onClick={handleBooking}
          leftIcon={<CalendarDaysIcon className="h-5 w-5 mr-1" />}
          colorScheme="green"
        >
          Book now
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TurfCard;
