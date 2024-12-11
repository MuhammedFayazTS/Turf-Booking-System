import React from 'react';
import { Menu, MenuButton, MenuItem, MenuList, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { ArrowLongRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const ServicesMenu = ({ services }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="unstyled"
        fontSize="lg"
        display="flex"
        alignItems="center"
        rightIcon={<ChevronDownIcon />}
      >
        SERVICES
      </MenuButton>
      <MenuList mt={{ base: 1, md: 5 }}>
        {services.map((service, index) => (
          <MenuItem as={Link} to={service.to} key={index} className="hover:text-green-800 flex justify-between">
            {service.service}
            <ArrowLongRightIcon className="w-5 h-5" />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ServicesMenu;
