import { Tab, TabList, TabPanel, TabPanels, Tabs, useBreakpointValue } from '@chakra-ui/react';
import React from 'react'
import { useSelector } from 'react-redux';
import NotificationTable from '../content/table/NotificationTable';

const Notifications = () => {
    const { loading, unseenNotifications = [], seenNotifications = [] } = useSelector((state) => state.notification);
    const showActions = useBreakpointValue({ base: false, md: true });
  
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
                  markAllAsRead
                  loading={loading}
                />
              </TabPanel>
              <TabPanel h="100%" overflowY="auto">
                {/* <NotificationTable
                  notifications={seenNotifications?.notifications || []}
                  noNotificationsMessage="No read notifications"
                  deleteAll
                /> */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    );
}

export default Notifications