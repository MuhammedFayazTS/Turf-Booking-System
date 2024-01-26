import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertSlice'
import { Link, useNavigate } from 'react-router-dom'
import { deleteAllNotificationsAPI, markAllAsReadAPI, updateReqStatusAPI } from '../../Services/allAPIs'
import toast from 'react-hot-toast'
import { setUser } from '../../redux/userSlice'
import { TrashIcon } from '@heroicons/react/24/solid'

function Notification() {

    const navigation = useNavigate()
    const { user } = useSelector(state => state.user)
    const { loading } = useSelector(state => state.alerts)
    const dispatch = useDispatch()

    // mark as read
    const markAllNotificationAsRead = async () => {
        dispatch(showLoading())
        try {
            const response = await markAllAsReadAPI();
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            // console.log(error);
        }
    }
    // remove all
    const removeAllNotifications = async () => {
        dispatch(showLoading())
        try {
            const response = await deleteAllNotificationsAPI();
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }
    // update request status
    const updateReqStatus = async (id, status) => {
        const req = {
            id: id,
            status: status
        }
        dispatch(showLoading())
        try {
            const response = await updateReqStatusAPI(req);
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(setUser(response.data.data))
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
        }
    }


    return (
        <div className='w-full h-[70svh]' >
            <div className="w-full h-full bg-slate-50 rounded-xl p-3">
                <Tabs colorScheme='green' align='center' h={'90%'}>
                    <TabList>
                        <Tab className='font-semibold'>Unread</Tab>
                        <Tab className='font-semibold'>Read</Tab>
                    </TabList>

                    <TabPanels h={'100%'}>
                        <TabPanel h={'100%'} overflowY={'auto'} >
                            {
                                user?.unseenNotifications?.length > 0 &&
                                <div className='flex justify-end mb-2 px-3'>
                                    <Button onClick={() => markAllNotificationAsRead()} variant={'link'} colorScheme='green' >Mark all as read</Button>
                                </div>
                            }
                            <ul className='h-full'>
                                {
                                    user?.unseenNotifications.length > 0 && user?.unseenNotifications.map((notification, index) => (
                                        <li key={index} className='flex flex-col space-y-1'>
                                            <motion.div
                                                initial={{ background: 'transparent' }}
                                                whileHover={{ background: '#E2E8F0' }} transition={{ duration: 0.3, type: 'tween' }}
                                                className='h-12 rounded-sm'>

                                                <div className="flex justify-between items-center px-3 w-full h-full overflow-hidden">
                                                    <p className="text-md font-semibold">{notification?.type}</p>
                                                    <p className="text-md hidden md:block max-w-[70ch] overflow-hidden text-nowrap  text-ellipsis ">
                                                        {notification?.message}
                                                    </p>
                                                    {
                                                        user.isAdmin ?
                                                        <Menu>
                                                            <MenuButton as={Button} colorScheme='green' variant={{ base: 'link', md: 'ghost' }} rightIcon={<ChevronDownIcon className='w-5 h-5' />}>
                                                                <span className='hidden md:block'>Actions</span>
                                                            </MenuButton>
                                                            <MenuList>
                                                                <MenuItem
                                                                    onClick={() => updateReqStatus(notification.data.venueId, "approved")} >Approve</MenuItem>
                                                                <MenuItem color={'red'}
                                                                    onClick={() => updateReqStatus(notification.data.venueId, "rejected")} >Reject</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                        :
                                                        <Link to={notification.onClickPath} color='blue'>View</Link>
                                                    }
                                                </div>

                                            </motion.div>
                                            <Divider />
                                        </li>
                                    ))
                                }
                            </ul>
                        </TabPanel>
                        <TabPanel h={'100%'} overflowY={'auto'} >
                            {
                                user?.seenNotifications?.length > 0 &&
                                <div className='flex justify-end mb-2 px-3'>
                                    <Button onClick={() => removeAllNotifications()} variant={'link'} colorScheme='red' >delete all</Button>
                                </div>
                            }
                            <ul className='h-full'>
                                {
                                    user?.seenNotifications.length > 0 && user?.seenNotifications.map((notification, index) => (
                                        <li key={index} className='flex flex-col space-y-1'>
                                            <motion.div
                                                initial={{ background: 'transparent' }}
                                                whileHover={{ background: '#E2E8F0' }} transition={{ duration: 0.3, type: 'tween' }}
                                                className='h-12 rounded-sm'>

                                                <div className="flex justify-between items-center px-3 w-full overflow-hidden">
                                                    <p className="text-md font-semibold">{notification.type}</p>
                                                    <p className="text-md hidden md:block max-w-[70ch] overflow-hidden text-nowrap  text-ellipsis ">
                                                        {notification.message}
                                                    </p>
                                                    <Button display={{ base: 'none', md: 'block' }} variant={'ghost'} colorScheme='twitter'>remove</Button>
                                                    <Button display={{ base: 'block', md: 'none' }} variant={'ghost'} colorScheme='red'><TrashIcon className='w-5 h-5' /></Button>
                                                </div>

                                            </motion.div>
                                            <Divider />
                                        </li>
                                    ))
                                }
                            </ul>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    )
}

export default Notification