import React, { useEffect, useState } from 'react'
import Header from '../Components/Header/Header'
import Carousel from '../Components/Swiper/Carousel'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    Button,
    ButtonGroup,
    Grid,
    GridItem,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Select,
    Text,
} from '@chakra-ui/react'
import { ChevronRightIcon, ListBulletIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from 'react-router-dom'
import { Squares2X2Icon } from '@heroicons/react/24/outline'
import VenueCard from '../Components/Cards/VenueCard'
import VenueCardHorizontal from '../Components/Cards/VenueCardHorizontal'
import { getAllVenuesAPI } from '../Services/allAPIs'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertSlice'
import { motion } from 'framer-motion'
import RightDrawer from '../Components/Drawer/RightDrawer'
import { Search2Icon } from '@chakra-ui/icons'


function VenuesListing() {
    const navigation = useNavigate()
    const { loading } = useSelector(state => state.alerts)
    const dispatch = useDispatch()
    const [allVenues, setAllVenues] = useState([])
    const [sort, setSort] = useState('price,asc')
    const [search, setSearch] = useState('')
    const [sports, setSports] = useState([])
    const [priceRange, setPriceRange] = useState([800, 2000]);
    const [selectedAmenities, setSelectedAmenities] = useState([])
    const [location, setLocation] = useState('All')
    const [filter, setFilter] = useState(false)
    // listing type
    const [gridListing, setGridListing] = useState(true)


    const getAllVenues = async () => {
        search == '' || location == '' && dispatch(showLoading())
        try {
            let minPrice = priceRange[0]
            let maxPrice = priceRange[1]
            const response = await getAllVenuesAPI({ sort, search, sports, selectedAmenities, minPrice, maxPrice, location });
            if (response) {
                setAllVenues(response.data)
                dispatch(hideLoading())
            } else {
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }

    useEffect(() => {
        getAllVenues()
    }, [ search,filter,location]);


    return (
        <div className='bg-slate-100'>
            <Header pos={'sticky'} />
            {/* carousel */}
            <Carousel />
            {/* heading section */}


            <motion.div
                initial={{ x: -50 }} whileInView={{ x: 0 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
                className="w-full h-fit flex flex-col justify-center py-8 px-5 md:px-20">
                <div className='flex justify-between'>
                    <h2 className='text-3xl font-semibold'>Venue List</h2>
                    <div className='flex items-center'>
                        <Popover>
                            <PopoverTrigger>
                                <Button colorScheme='green' variant={'ghost'}
                                    leftIcon={<MapPinIcon class="h-6 w-6" />}>
                                    <h4 className="text-xl">{location}</h4>
                                </Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverHeader>City Name</PopoverHeader>
                                    <PopoverCloseButton />
                                    <PopoverBody>
                                        <Button variant={'ghost'} onClick={(e) => setLocation('All')}>All Locations</Button>
                                        <Input onChange={(e) => setLocation(e.target.value)}
                                            value={location} type="text" placeholder={'city name'} />
                                    </PopoverBody>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                    </div>
                </div>
                <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' className='w-4 h-4' />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={Link} to={'/'}>Home</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink as={Link} to={'/venue-list'}>venue-list</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>
            </motion.div>

            <div className='w-full flex flex-col gap-y-5 items-center pb-10'>

                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .6, type: 'tween' }} viewport={{ once: true }}
                    className="w-11/12 p-5 bg-white shadow-lg rounded-lg flex flex-col gap-y-2 md:flex-row items-center justify-between">
                    <h4 className="text-xl font-medium "><span className='text-emerald-600'>
                        {allVenues?.length}
                    </span> Venues</h4>
                    <div className="flex  items-center gap-x-4">
                        {/* search input box */}
                        <InputGroup borderColor={'gray.300'}>
                            <InputLeftElement pointerEvents='none'>
                                <Search2Icon color='gray.300' />
                            </InputLeftElement>
                            <Input onChange={(e) => setSearch(e.target.value)} value={search}
                                type='search' placeholder='name of venue' />
                        </InputGroup>
                        {/* search end */}
                        <ButtonGroup>
                            <Button onClick={() => setGridListing(false)} display={{ base: 'none', md: 'block' }}>
                                <ListBulletIcon class="h-6 w-6 text-slate-700" />
                            </Button>
                            <Button onClick={() => setGridListing(true)} display={{ base: 'none', md: 'block' }}>
                                <Squares2X2Icon class="h-6 w-6 text-slate-700" />
                            </Button>
                            {/* right drawer mernu */}
                            <RightDrawer
                                setFilter={setFilter}
                                setSort={setSort} setSports={setSports} sports={sports}
                                setPriceRange={setPriceRange} priceRange={priceRange}
                                setSelectedAmenities={setSelectedAmenities} selectedAmenities={selectedAmenities}
                            />
                        </ButtonGroup>

                    </div>
                </motion.div>

                {
                    gridListing ?
                        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }} w={'92%'} gap={6}>
                            {/* vertical listing */}
                            {
                                allVenues?.length > 0 && allVenues?.map((venue, index) => (
                                    <GridItem key={index} w='100%' >
                                        <VenueCard data={venue} />
                                    </GridItem>
                                ))

                            }
                        </Grid>
                        :
                        <Grid templateColumns='repeat(1, 1fr)' w={'92%'} gap={6}>
                            {/* horizontal listing */}
                            {
                                allVenues.length > 0 && allVenues.map((venue, index) => (
                                    <GridItem key={index} w='100%' >
                                        <VenueCardHorizontal data={venue} />
                                    </GridItem>
                                ))

                            }
                        </Grid>
                }






            </div>

        </div>
    )
}

export default VenuesListing