import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationTable from '../content/table/NotificationTable';
import {
  deleteNotifications,
  listSeenNotifications,
  listUnseenNotifications,
  markNotificationsAsSeen,
} from '../../redux/slices/notification.slice';

const Notifications = () => {
  const { loading, unseenNotifications = [], seenNotifications = [] } = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUnseenNotifications());
    dispatch(listSeenNotifications());
  }, [dispatch]);

  const markSelectedNotificationsAsRead = async (ids) => {
    if (!ids || !ids?.length) return;
    await dispatch(markNotificationsAsSeen(ids));
  };

  const deleteSelectedNotifications = async (ids) => {
    if (!ids || !ids?.length) return;
    await dispatch(deleteNotifications(ids));
  };

  return (
    <div className="w-full h-[70svh]">
      <div className="w-full h-full bg-slate-50 rounded-xl p-3">
        <Tabs colorScheme="green" align="center" h="100%">
          <TabList>
            <Tab className="font-semibold">Unread</Tab>
            <Tab className="font-semibold">Read</Tab>
          </TabList>

          <TabPanels h="100%">
            <TabPanel h="100%" overflowY="auto">
              <NotificationTable
                notifications={unseenNotifications?.notifications || []}
                noNotificationsMessage="No unread notifications"
                loading={loading}
                showMarkAsReadButton
                markAllAsRead={markSelectedNotificationsAsRead}
                deleteAll={deleteSelectedNotifications}
              />
            </TabPanel>
            <TabPanel h="100%" overflowY="auto">
              <NotificationTable
                notifications={seenNotifications?.notifications || []}
                noNotificationsMessage="No read notifications"
                deleteAll={deleteSelectedNotifications}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;
