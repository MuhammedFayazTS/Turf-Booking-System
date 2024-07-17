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
import { BellIcon } from '@chakra-ui/icons';

const UserMenu = ({ user, handleSignOut }) => {
  const navigate = useNavigate();

  return (
    <div className="flex absolute md:relative right-16 md:right-0 top-4 md:top-0 md:space-x-1 items-center">
      <IconButton onClick={() => navigate('/my-profile/notifications')} isRound variant="ghost">
        <div className="relative">
          <BellIcon w={6} h={6} />
          {user?.notifications?.length > 0 && (
            <div className="w-5 h-5 bg-green-500 absolute -top-3 -right-3 rounded-full flex items-center justify-center">
              <span className="text-sm text-white">{user?.notifications.length}</span>
            </div>
          )}
        </div>
      </IconButton>

      <Menu>
        <MenuButton as={IconButton} isRound colorScheme="gray" variant="ghost">
          <Avatar size="sm" src={user?.image} name={user?.username} />
        </MenuButton>
        <Portal>
          <MenuList zIndex={30}>
            <MenuGroup title="Profile">
              <MenuItem as={Link} to="/my-profile">
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
