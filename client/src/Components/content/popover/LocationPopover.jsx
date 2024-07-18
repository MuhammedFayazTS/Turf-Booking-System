import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  Portal,
  Input,
  IconButton,
  Stack,
  Tooltip,
} from '@chakra-ui/react';
import { MapPinIcon } from '@heroicons/react/24/solid';
import { setLocation } from '../../../redux/slices/auth.slice';
import { getUserLocation } from '../../../Utils/location.helper';
const currentLocationIcon = 'assets/images/svg/current-location-svgrepo-com.svg';

export const LocationPopover = () => {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.auth.location);
  const [isOpen, setIsOpen] = useState(false);
  const [locationText, setLocationText] = useState('');

  useEffect(() => {
    setLocationText(location?.name || '');
  }, [location?.name]);

  const handleLocationChange = (e) => {
    setLocationText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    dispatch(setLocation({ name: locationText, latitude: '', longitude: '' }));
    setIsOpen(false);
  };

  const handleSetAllLocation = () => {
    dispatch(setLocation({ name: 'All', latitude: '', longitude: '' }));
    handleClose();
  };

  const handleGetCurrentLocation = (e) => {
    e.preventDefault();
    getUserLocation(dispatch, setLocation);
    handleClose();
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <Popover isOpen={isOpen} onClose={handleClose}>
      <PopoverTrigger>
        <Button colorScheme="green" variant="ghost" leftIcon={<MapPinIcon className="h-6 w-6" />} onClick={handleOpen}>
          <h4 className="text-xl">{location ? location.name : 'No Location'}</h4>
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>City Name</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Stack direction={'row'} justifyContent={'space-between'} m={1}>
              <Tooltip label="All locations">
                <Button size={'sm'} variant="outline" onClick={handleSetAllLocation}>
                  All
                </Button>
              </Tooltip>
              <Tooltip label="Current location">
                <IconButton
                  variant="ghost"
                  size="sm"
                  colorScheme="whatsapp"
                  aria-label="current location"
                  onClick={handleGetCurrentLocation}
                  icon={<img src={currentLocationIcon} alt="current-location-icon" className="w-6 h-6" />}
                />
              </Tooltip>
            </Stack>
            <Input
              onChange={handleLocationChange}
              onKeyDown={handleKeyDown}
              value={locationText}
              type="text"
              placeholder="City name"
            />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};
