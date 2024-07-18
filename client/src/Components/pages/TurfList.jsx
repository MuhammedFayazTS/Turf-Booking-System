import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { ChevronRightIcon, ListBulletIcon, Squares2X2Icon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Carousel from '../Swiper/Carousel';
import RightDrawer from '../Drawer/RightDrawer';
import Header from '../core/Header/Header';
import TurfCard from '../content/card/TurfCard';
import TurfCardHorizontal from '../content/card/TurfCardHorizontal';
import { LocationPopover } from '../content/popover/LocationPopover';
import { getUserLocation } from '../../Utils/location.helper';
import { setLocation } from '../../redux/slices/auth.slice';
import { listTurfs } from '../../redux/slices/turf.slice';

// TODO: fetch banner image from db
const imageList = [
  {
    src: 'https://blog.playo.co/wp-content/uploads/2017/10/football-grounds-in-dubai.jpg',
    alt: 'Football Grounds in Dubai',
  },
  {
    src: 'https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vdGJhbGwlMjBncm91bmR8ZW58MHx8MHx8fDA%3D',
    alt: 'Outdoor Football Ground',
  },
];

const TurfList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, turfs } = useSelector((state) => state.turf);
  const { location } = useSelector((state) => state.auth);
  const [sort, setSort] = useState('price,asc');
  const [search, setSearch] = useState('');
  const [sports, setSports] = useState([]);
  const [priceRange, setPriceRange] = useState([800, 2000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [filter, setFilter] = useState(false);
  const [gridListing, setGridListing] = useState(true);

  // const getAllVenues = async () => {
  //     if (search === '' || location === '') dispatch(showLoading());

  //     try {
  //         const [minPrice, maxPrice] = priceRange;
  //         const response = await getAllVenuesAPI({
  //             sort,
  //             search,
  //             sports,
  //             selectedAmenities,
  //             minPrice,
  //             maxPrice,
  //             location,
  //         });

  //         if (response) {
  //             setAllVenues(response.data);
  //         }
  //     } catch (error) {
  //         console.error(error);
  //     } finally {
  //         dispatch(hideLoading());
  //     }
  // };

  useEffect(() => {
    // TODO: get all venues
    // getAllVenues();
    getUserLocation(dispatch, setLocation);
    // dispatch(listTurfs());
  }, [dispatch]);

  return (
    <div className="bg-slate-100">
      <Header pos={'sticky'} />
      <Carousel images={imageList} />

      <motion.div
        initial={{ x: -50 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.6, type: 'tween' }}
        viewport={{ once: true }}
        className="w-full h-fit flex flex-col justify-center py-8 px-5 md:px-20"
      >
        <div className="flex justify-between">
          <h2 className="text-3xl font-semibold">Turf List</h2>
          <LocationPopover location={location} />
        </div>

        <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" className="w-4 h-4" />}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink as={Link} to="/turf-list">
              Turf List
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </motion.div>
      <div className="w-full flex flex-col gap-y-5 items-center pb-10">
        <VenueStats
          turfs={turfs}
          search={search}
          setSearch={setSearch}
          setGridListing={setGridListing}
          setFilter={setFilter}
          setSort={setSort}
          setSports={setSports}
          setPriceRange={setPriceRange}
          setSelectedAmenities={setSelectedAmenities}
        />
        <TurfGrid turfs={turfs} gridListing={gridListing} />
      </div>
    </div>
  );
};

const VenueStats = ({
  turfs,
  search,
  setSearch,
  setGridListing,
  setFilter,
  setSort,
  setSports,
  setPriceRange,
  setSelectedAmenities,
}) => (
  <motion.div
    initial={{ scale: 1.1, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.6, type: 'tween' }}
    viewport={{ once: true }}
    className="w-11/12 p-5 bg-white shadow-lg rounded-lg flex flex-col gap-y-2 md:flex-row items-center justify-between"
  >
    <h4 className="text-xl font-medium">
      <span className="text-emerald-600">{turfs?.length}</span> Venues
    </h4>
    <div className="flex items-center gap-x-4">
      <InputGroup borderColor="gray.300">
        <InputLeftElement pointerEvents="none">
          <MagnifyingGlassIcon color="gray.300" />
        </InputLeftElement>
        <Input onChange={(e) => setSearch(e.target.value)} value={search} type="search" placeholder="Name of turf" />
      </InputGroup>
      <ButtonGroup>
        <Button onClick={() => setGridListing(false)} display={{ base: 'none', md: 'block' }}>
          <ListBulletIcon className="h-6 w-6 text-slate-700" />
        </Button>
        <Button onClick={() => setGridListing(true)} display={{ base: 'none', md: 'block' }}>
          <Squares2X2Icon className="h-6 w-6 text-slate-700" />
        </Button>
        {/* <RightDrawer
          setFilter={setFilter}
          setSort={setSort}
          setSports={setSports}
          setPriceRange={setPriceRange}
          setSelectedAmenities={setSelectedAmenities}
        /> */}
      </ButtonGroup>
    </div>
  </motion.div>
);

const TurfGrid = ({ turfs, gridListing }) => (
  <Grid
    templateColumns={gridListing ? { base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' } : 'repeat(1, 1fr)'}
    w="92%"
    gap={6}
  >
    {turfs.length > 0 &&
      turfs.map((turf, index) => (
        <GridItem key={index} w="100%">
          {gridListing ? <TurfCard data={turf} /> : <TurfCardHorizontal data={turf} />}
        </GridItem>
      ))}
  </Grid>
);

export default TurfList;
