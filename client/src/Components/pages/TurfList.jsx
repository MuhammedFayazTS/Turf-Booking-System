import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import Pagination from '../content/pagination/Pagination';
import LoadingTurfCard from '../content/card/LoadingTurfCard';
import LoadingTurfCardHorizontal from '../content/card/LoadingTurfCardHorizontal';
import NotFoundFallback from '../content/fallback/NotFoundFallback';

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
  const { loading, turfs } = useSelector((state) => state.turf);
  const { location } = useSelector((state) => state.auth);
  const [gridListing, setGridListing] = useState(true);
  const [filterApplied, setFilterApplied] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [filterState, setFilterState] = useState({
    search: '',
    sort: '',
    sports: [],
    selectedAmenities: [],
    priceRange: [800, 6000],
    location: location?.name,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // TODO: Implement logic to fetch data for the new page
  };

  const handleFilterChange = () => {
    setFilterApplied(true); // Example logic to set filter applied state
  };

  useEffect(() => {
    if (!location?.name) {
      getUserLocation(dispatch, setLocation);
    }
    dispatch(listTurfs({ location: location?.name }));
  }, [dispatch, location?.name]);

  const onChangeLocation = useCallback(() => {
    setFilterState((prev) =>
      Object.assign({}, prev, {
        location: location?.name,
      })
    );
  }, [location?.name]);

  useEffect(() => {
    onChangeLocation();
  }, [onChangeLocation]);

  useEffect(() => {
    if (filterApplied) {
      dispatch(listTurfs(filterState));
    }
  }, [dispatch, filterApplied, filterState]);

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
          gridListing={gridListing}
          setGridListing={setGridListing}
          setFilterApplied={setFilterApplied}
          handleFilterChange={handleFilterChange}
          filterState={filterState}
          setFilterState={setFilterState}
        />
        {(!turfs?.turfs || turfs?.turfs?.length === 0) && <NotFoundFallback message={'We can&apos;t find any turfs'} />}
        <TurfGrid turfs={turfs.turfs} gridListing={gridListing} loading={loading} />
        <Pagination currentPage={currentPage} onPageChange={handlePageChange} totalPages={turfs.totalPages} />
      </div>
    </div>
  );
};

const TurfGrid = ({ turfs, gridListing, loading = false }) => (
  <Grid
    templateColumns={gridListing ? { base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' } : 'repeat(1, 1fr)'}
    w="92%"
    gap={6}
  >
    {loading &&
      Array.from({ length: 4 })?.map((_, index) => (
        <GridItem key={index} w="100%">
          {gridListing ? <LoadingTurfCard /> : <LoadingTurfCardHorizontal />}
        </GridItem>
      ))}

    {turfs?.length > 0 &&
      turfs?.map((turf, index) => (
        <GridItem key={turf._id} w="100%">
          {gridListing ? <TurfCard data={turf} /> : <TurfCardHorizontal data={turf} />}
        </GridItem>
      ))}
  </Grid>
);

export default TurfList;
