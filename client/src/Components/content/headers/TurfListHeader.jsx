import { motion } from 'framer-motion';
import { InputGroup, InputLeftElement, Input, ButtonGroup, Button } from '@chakra-ui/react';
import { ListBulletIcon, MagnifyingGlassIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import RightDrawer from '../drawer/RightDrawer';
import { useDispatch } from 'react-redux';
import { listTurfs } from '../../../redux/slices/turf.slice';
import { debounce } from 'lodash';

const TurfListHeader = ({
  turfs,
  setGridListing,
  handleFilterChange,
  setFilterApplied,
  filterState,
  setFilterState,
}) => {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    debouncedSearch(searchTerm);
  };

  const debouncedSearch = debounce((searchTerm) => {
    dispatch(listTurfs({ ...filterState, search: searchTerm }));
    setFilterState({ ...filterState, search: searchTerm });
  }, 600);

  return (
    <motion.div
      initial={{ scale: 1.1, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'tween' }}
      viewport={{ once: true }}
      className="w-11/12 p-5 bg-white shadow-lg rounded-lg flex flex-col gap-y-2 md:flex-row items-center justify-between"
    >
      <h4 className="text-xl font-medium">
        <span className="text-emerald-600">{turfs?.length}</span> Turfs
      </h4>
      <div className="flex items-center gap-x-4">
        <InputGroup borderColor="gray.300">
          <InputLeftElement pointerEvents="none">
            <MagnifyingGlassIcon color="gray.300" className="w-5 h-5" />
          </InputLeftElement>
          <Input
            onChange={handleSearch}
            // value={filterState.search}
            type="search"
            placeholder="name or location of turf"
          />
        </InputGroup>
        <ButtonGroup>
          <Button onClick={() => setGridListing(false)} display={{ base: 'none', md: 'block' }}>
            <ListBulletIcon className="h-6 w-6 text-slate-700" />
          </Button>
          <Button onClick={() => setGridListing(true)} display={{ base: 'none', md: 'block' }}>
            <Squares2X2Icon className="h-6 w-6 text-slate-700" />
          </Button>
        </ButtonGroup>

        <RightDrawer
          setFilter={handleFilterChange}
          setFilterApplied={setFilterApplied}
          filterState={filterState}
          setFilterState={setFilterState}
        />
      </div>
    </motion.div>
  );
};

export default TurfListHeader;
