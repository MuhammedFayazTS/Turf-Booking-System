import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DisplayStarRating from '../Reviews & Rating/DisplayStarRating'


const defaultImage = 'https://media.istockphoto.com/id/520999573/photo/indoor-soccer-football-field.jpg?s=612x612&w=0&k=20&c=X2PinGm51YPcqCAFCqDh7GvJxoG2WnJ19aadfRYk2dI='

function VenueCardHorizontal({ data }) {
    const navigate = useNavigate()
    return (
        <>
            <Card
                as={motion.div} initial={{ scale: .9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
            >
                <Image
                    objectFit='cover'
                    maxW={{ base: '100%', sm: '300px' }}
                    aspectRatio={'1/1'}
                    src={data.images[0] ? data.images[0] : defaultImage}
                    alt={data?.name}
                />

                <Stack>
                    <CardBody className='flex flex-col space-y-2'>

                        <div className="flex space-x-2 items-center">
                            {/* for rating display */}
                            {data?.rating?.stars &&
                                <div className="bg-amber-500 w-8 text-white p-1.5 rounded-md text-sm font-medium flex justify-center">{data?.rating?.stars?.toFixed(1)}</div>
                            }
                            <DisplayStarRating rating={data?.rating?.stars} />
                            <p className='text-gray-600 text-md'>{data?.rating?.count || 0} Reviews</p>
                        </div>


                        <Heading size='md'>{data.name}</Heading>

                        <Text>
                            {data.overview}
                        </Text>
                        <Text color='gray.600' className='flex items-center gap-1' fontSize='md'>
                            <MapPinIcon className="h-5 w-5" />
                            {data.location}
                        </Text>
                    </CardBody>

                    <CardFooter>
                        <Button onClick={() => navigate(`/venue/${data._id}`)} variant='solid' leftIcon={<CalendarDaysIcon className="h-5 w-5 mr-1" />} colorScheme='green'>
                            Book now
                        </Button>
                    </CardFooter>
                </Stack>
            </Card>
        </>
    )
}

export default VenueCardHorizontal