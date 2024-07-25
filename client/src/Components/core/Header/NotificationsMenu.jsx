import React from 'react';
import { IconButton, Menu, MenuButton, MenuList, MenuItem, MenuGroup, Center, Button } from '@chakra-ui/react';
import { BellIcon, InfoIcon, WarningIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const NotificationsMenu = ({ notifications }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'info':
        return <InfoIcon color="blue.500" />;
      case 'warning':
        return <WarningIcon color="yellow.500" />;
      case 'error':
        return <NotAllowedIcon color="red.500" />;
      case 'success':
        return <CheckCircleIcon color="green.500" />;
      default:
        return <InfoIcon />;
    }
  };

  // Limit the notifications to a maximum of 4
  const limitedNotifications = notifications?.slice(0, 4);

  return (
    <div className="flex absolute md:relative right-16 md:right-0 top-4 md:top-0 md:space-x-1 items-center">
      <Menu closeOnBlur={true} isLazy={true}>
        <MenuButton as={IconButton} isRound variant="ghost">
          <div className="relative">
            <BellIcon w={6} h={6} />
            {notifications?.length > 0 && (
              <div className="w-5 h-5 bg-green-500 absolute -top-2 -right-2 rounded-full flex items-center justify-center">
                <span className="text-sm text-white">{notifications.length}</span>
              </div>
            )}
          </div>
        </MenuButton>
        <MenuList zIndex={30}>
          <MenuGroup title="Notifications">
            {limitedNotifications?.map((notification) => (
              <MenuItem key={notification.id}>
                <div className="flex items-center">
                  {getNotificationIcon(notification.type)}
                  <div className="ml-2">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-sm text-gray-500" style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {notification.message}
                    </p>
                  </div>
                </div>
              </MenuItem>
            ))}
          </MenuGroup>
          <Center py={2}>
            <Button as={Link} variant="link" size={'sm'} to={'/notifications'}>
              View more
            </Button>
          </Center>
        </MenuList>
      </Menu>
    </div>
  );
};

export default NotificationsMenu;
