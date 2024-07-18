import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Select,
  Text,
  FormLabel,
  FormControl,
  CheckboxGroup,
  Stack,
  Checkbox,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  useDisclosure,
  ButtonGroup,
} from '@chakra-ui/react';

const SportsTypes = ['Football', 'Cricket', 'Badminton', 'Swimming', 'Basketball', 'Tennis', 'VolleyBall'];
const amenitiesFilter = ['Parking', 'Drinking Water', 'Washroom', 'Food Court', 'WiFi'];

function RightDrawer({ setFilter, setFilterApplied }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [filterState, setFilterState] = useState({
    sort: '',
    sports: [],
    selectedAmenities: [],
    priceRange: [800, 6000],
  });

  const handleChange = (key, value) => {
    setFilterState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleApplyFilter = () => {
    setFilter((prev) => !prev);
    onClose();
  };

  return (
    <>
      <Button ref={btnRef} colorScheme="green" onClick={onOpen}>
        Filter
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={{ base: 'full', md: 'xs' }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter using details</DrawerHeader>

          <DrawerBody>
            <div className="flex w-full flex-col gap-y-2">
              {/* Sorting */}
              <FormControl>
                <FormLabel size={'md'}>Sort by :</FormLabel>
                <Select onChange={(e) => handleChange('sort', e.target.value)} placeholder="Sort by">
                  <option value={'price,asc'}>Lowest Price</option>
                  <option value={'price,desc'}>Highest Price</option>
                  <option value={'rating.stars,desc'}>Highest Rated</option>
                  <option value={'rating.stars,asc'}>Lowest Rated</option>
                  <option value={'createdAt,desc'}>Latest Added Turf</option>
                  <option value={'createdAt,asc'}>Earliest Added Turf</option>
                </Select>
              </FormControl>

              {/* Sports */}
              <FormControl>
                <FormLabel size={'md'}>Sports :</FormLabel>
                <CheckboxGroup
                  onChange={(values) => handleChange('sports', values)}
                  value={filterState.sports}
                  colorScheme="green"
                >
                  <Stack spacing={[1, 5]} flexWrap={'wrap'} direction={['column', 'row']}>
                    {SportsTypes.map((sport, index) => (
                      <Checkbox key={index} value={sport}>
                        {sport}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </FormControl>

              {/* Amenities */}
              <FormControl>
                <FormLabel size={'md'}>Amenities :</FormLabel>
                <CheckboxGroup
                  colorScheme="green"
                  onChange={(values) => handleChange('selectedAmenities', values)}
                  value={filterState.selectedAmenities}
                >
                  <Stack spacing={[1, 5]} flexWrap={'wrap'} direction={['column', 'row']}>
                    {amenitiesFilter.map((amenity, index) => (
                      <Checkbox key={index} value={amenity}>
                        {amenity}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </FormControl>

              {/* Price Slider */}
              <FormControl>
                <FormLabel>Price Range:</FormLabel>
                <RangeSlider
                  onChange={(values) => handleChange('priceRange', values)}
                  defaultValue={filterState.priceRange}
                  min={800}
                  max={6000}
                  step={100}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
                <Text textAlign="center" mt={2}>
                  {`₹${filterState.priceRange[0]} - ₹${filterState.priceRange[1]}`}
                </Text>
              </FormControl>
            </div>
          </DrawerBody>

          <DrawerFooter justifyContent={'center'}>
            <ButtonGroup>
              <Button onClick={handleApplyFilter} colorScheme="green">
                Filter
              </Button>
              <Button onClick={() => setFilterApplied(false)}>Clear</Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default RightDrawer;
