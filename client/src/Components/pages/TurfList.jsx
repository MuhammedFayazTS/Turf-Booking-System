import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid, GridItem } from '@chakra-ui/react';
import Carousel from '../Swiper/Carousel';
import Header from '../core/Header/Header';
import TurfCard from '../content/card/TurfCard';
import TurfCardHorizontal from '../content/card/TurfCardHorizontal';
import { LocationPopover } from '../content/popover/LocationPopover';
import { getUserLocation } from '../../Utils/location.helper';
import { setLocation } from '../../redux/slices/auth.slice';
import { listTurfs } from '../../redux/slices/turf.slice';
import Breadcrumbs from '../content/breadcrumbs/Breadcrumbs';
import TurfListHeader from '../content/headers/TurfListHeader';
import Loader from '../loader/Loader';
import Pagination from '../content/pagination/Pagination';

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

const breadcrumbItems = [
  { label: 'Home', to: '/' },
  { label: 'Turf List', to: '/turf-list', isCurrentPage: true },
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
  const [filterApplied, setFilterApplied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // TODO: Implement logic to fetch data for the new page
  };

  const handleFilterChange = () => {
    // TODO: Implement your logic to apply filters
    setFilterApplied(true); // Example logic to set filter applied state
  };

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
    dispatch(listTurfs());
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

        <Breadcrumbs items={breadcrumbItems} />
      </motion.div>

      <div className="w-full flex flex-col gap-y-5 items-center pb-10">
        <TurfListHeader
          turfs={turfs.turfs}
          search={search}
          setSearch={setSearch}
          setGridListing={setGridListing}
          setFilterApplied={setFilterApplied}
          handleFilterChange={handleFilterChange}
        />
        {loading ? <Loader /> : <TurfGrid turfs={turfs.turfs} gridListing={gridListing} />}
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={turfs.totalPages} />
      </div>
    </div>
  );
};

const TurfGrid = ({ turfs, gridListing }) => (
  <Grid
    templateColumns={gridListing ? { base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' } : 'repeat(1, 1fr)'}
    w="92%"
    gap={6}
  >
    {turfs?.length > 0 &&
      turfs?.map((turf, index) => (
        <GridItem key={index} w="100%">
          {gridListing ? <TurfCard data={turf} /> : <TurfCardHorizontal data={turf} />}
        </GridItem>
      ))}
  </Grid>
);

export default TurfList;
