import React, { useState } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    useDisclosure,
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
} from '@chakra-ui/react'
import { SportsTypes, amenitiesFilter } from './FormData'

function RightDrawer({ ...props }) {
    const { setSort, setSports, sports,setSelectedAmenities,selectedAmenities,setPriceRange,priceRange,setFilter } = props
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    

    const handleSliderChange = (newValues) => {
        setPriceRange(newValues);
    };

    const handleSportsChange = (values) => {
        setSports(values);
    };

    const handleAmenitiesChange = (values) => {
        setSelectedAmenities(values);
      };

    return (
        <>
            <Button ref={btnRef} colorScheme='green' onClick={onOpen}>
                Filter
            </Button>

            <Drawer
                isOpen={isOpen}
                placement='right'
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
                            {/* sorting */}
                            <FormControl>
                                <FormLabel size={'md'}>Sort by :</FormLabel>
                                <Select onChange={(e) => setSort(e.target.value)} placeholder='Sort by'>
                                    <option value={'price,asc'}>Lowest Price</option>
                                    <option value={'price,desc'}>Highest Price</option>
                                    <option value={'createdAt,desc'}>Latest Turf</option>
                                    <option value={'createdAt,asc'}>Oldest Turf</option>
                                </Select>
                            </FormControl>

                            {/* sports */}
                            <FormControl>
                                <FormLabel size={'md'}>Sports :</FormLabel>
                                <CheckboxGroup
                                    onChange={handleSportsChange}
                                    value={sports}
                                    colorScheme='green' defaultValue={[SportsTypes[0]]}>
                                    <Stack spacing={[1, 5]} flexWrap={'wrap'} direction={['column', 'row']}>
                                        {
                                            SportsTypes?.map((sport, index) => (
                                                <Checkbox key={'sports' + index} value={sport}>{sport}</Checkbox>
                                            ))
                                        }
                                    </Stack>
                                </CheckboxGroup>
                            </FormControl>

                            {/* amenities */}
                            <FormControl>
                                <FormLabel size={'md'}>Amenities :</FormLabel>
                                <CheckboxGroup colorScheme='green'
                                onChange={handleAmenitiesChange}
                                value={selectedAmenities}
                                defaultValue={[SportsTypes[0]]}>
                                    <Stack spacing={[1, 5]} flexWrap={'wrap'} direction={['column', 'row']}>
                                        {
                                            amenitiesFilter?.map((amenity, index) => (
                                                <Checkbox key={'amenity' + index} value={amenity}>{amenity}</Checkbox>
                                            ))
                                        }
                                    </Stack>
                                </CheckboxGroup>
                            </FormControl>

                            {/* price slider */}
                            <FormControl>
                                <FormLabel>Price Range:</FormLabel>
                                <RangeSlider
                                    onChange={handleSliderChange}
                                    defaultValue={[priceRange[0], priceRange[1]]} min={800} max={6000} step={100}>
                                    <RangeSliderTrack>
                                        <RangeSliderFilledTrack />
                                    </RangeSliderTrack>
                                    <RangeSliderThumb index={0} />
                                    <RangeSliderThumb index={1} />
                                </RangeSlider>
                                <Text textAlign="center" mt={2}>{`₹${priceRange[0]} - ₹${priceRange[1]}`}</Text>
                            </FormControl>

                        </div>
                    </DrawerBody>

                    <DrawerFooter justifyContent={'center'}>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                        onClick={(e)=>{setFilter(prev=>!prev)
                        onClose()}}
                        colorScheme='green'>Filter</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default RightDrawer