import React from 'react';
import { Avatar, Grid, GridItem } from '@chakra-ui/react';
import { BellIcon, BookmarkIcon, PencilIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Header from '../core/Header/Header';

const LinkButton = ({ to, icon: Icon, children, isActive }) => (
  <Link
    to={to}
    className={`w-full py-3 px-6 flex items-center ${isActive ? 'bg-green-600 text-gray-50' : 'hover:bg-green-100 hover:text-gray-700 text-gray-800'} gap-x-6`}
  >
    <Icon className="h-6 w-6" />
    {children}
  </Link>
);

function MyProfile() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div className="bg-slate-100 min-h-screen w-full">
      <Header pos="sticky" />

      <div className="w-full py-10 px-5 md:px-20">
        <Grid templateColumns="repeat(4, 1fr)" gap={6}>
          <GridItem
            as={motion.div}
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, type: 'tween' }}
            viewport={{ once: true }}
            colSpan={{ base: 4, md: 1 }}
            w="100%"
            h="550px"
            className="bg-white/60 border border-slate-300 flex flex-col items-center py-10 rounded-xl"
          >
            <Avatar size="xl" name={user?.username} src={user?.image} />
            <h3 className="mt-5 text-xl font-semibold">{user?.username}</h3>
            <h6 className="mb-5 text-sm">{user?.email}</h6>

            <LinkButton to="/profile" icon={PencilIcon} isActive={location.pathname === '/profile'}>
              Edit Profile
            </LinkButton>

            <LinkButton
              to="/profile/my-bookings"
              icon={BookmarkIcon}
              isActive={location.pathname === '/profile/my-bookings'}
            >
              All Bookings
            </LinkButton>

            <LinkButton
              to="/profile/notifications"
              icon={BellIcon}
              isActive={location.pathname === '/profile/notifications'}
            >
              Notifications
            </LinkButton>

            <LinkButton
              to="/profile/security"
              icon={LockClosedIcon}
              isActive={location.pathname === '/profile/security'}
            >
              Security
            </LinkButton>
          </GridItem>

          <GridItem
            as={motion.div}
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, type: 'tween' }}
            viewport={{ once: true }}
            w="100%"
            colSpan={{ base: 4, md: 3 }}
            minH="400px"
            className="bg-white/60 border border-slate-300 rounded-xl"
          >
            <Outlet />
          </GridItem>
        </Grid>
      </div>
    </div>
  );
}

export default MyProfile;
