import React from 'react';
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationsMenu from './NotificationsMenu';

const UserMenu = ({ user, handleSignOut,notifications }) => {
  return (
    <div className="flex absolute md:relative right-16 md:right-0 top-4 md:top-0 md:space-x-2 items-center">
      
      <NotificationsMenu notifications={notifications} />

      <Menu>
        <MenuButton as={IconButton} isRound colorScheme="gray" variant="ghost">
          <Avatar size="sm" src={user?.image} name={user?.username} />
        </MenuButton>
        <Portal>
          <MenuList zIndex={30}>
            <MenuGroup title="Profile">
              <MenuItem as={Link} to="/profile">
                My Profile
              </MenuItem>
              {user?.role === 'user' && (
                <MenuItem as={Link} to="/booking-summary">
                  Booking Summary
                </MenuItem>
              )}
              <MenuItem>Payments</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuItem onClick={handleSignOut} as={Button} size="sm" color="red">
                Sign Out
              </MenuItem>
            </MenuGroup>
          </MenuList>
        </Portal>
      </Menu>
    </div>
  );
};

export default UserMenu;
