import React, { useState } from 'react'
import SidebarComponent from '../Components/Sidebar/SidebarComponent'
import { Avatar, Button, IconButton, MenuButton, MenuDivider, MenuGroup, MenuList, Menu, MenuItem } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { ArrowUpIcon, BellIcon } from '@heroicons/react/24/outline'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ScrollToTop } from 'react-simple-scroll-up'

function AdminDashboard() {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className='min-h-screen flex ' >
            <SidebarComponent collapsed={collapsed} />

            <ScrollToTop className='z-20' strokeWidth={3} strokeFillColor={'#059669'} bgColor='#E2E8F0' symbol={<ArrowUpIcon className='w-6 h-6' />} />

            <div className='hidden md:block w-0 relative bg-transparent'>
                <IconButton
                    onClick={() => setCollapsed(!collapsed)}
                    isRound={true}
                    zIndex={5}
                    size={'sm'}
                    variant='solid'
                    colorScheme='whatsapp'
                    className='absolute top-16 -left-4 '>
                    {collapsed ?
                        <ChevronRightIcon className='w-5 h-5' /> :
                        <ChevronLeftIcon className='w-5 h-5' />
                    }
                </IconButton>
            </div>

            <div className='w-full flex flex-col items-center bg-slate-200'>
                {/* navbar */}
                <div className="w-11/12 h-20 flex items-center justify-between  ">
                    <div className='w-full h-full flex items-center justify-between bg-slate-50 mt-10  px-10  rounded-md shadow'>
                        <h3 className="text-2xl font-semibold">
                            Admin Dashboard
                        </h3>
                        <div className="flex items-center space-x-4">
                            <IconButton
                                className='relative'
                                bg={'gray.800'} color={'white'} _hover={{ bg: 'gray.700' }} _active={{ bg: 'gray.900' }}
                                size={'lg'} isRound variant={'solid'} >
                                <div onClick={() => navigate('/admin/notifications')} className='relative'>
                                    <BellIcon className='w-5 h-5 md:w-7 md:h-7' />
                                    {
                                        user?.unseenNotifications.length > 0 &&
                                        <div className="w-5 h-5 bg-green-500 absolute -top-3 -right-3 rounded-full flex items-center justify-center">
                                            <span className="text-sm">{user?.unseenNotifications.length}</span>
                                        </div>
                                    }
                                </div>

                            </IconButton>

                            <Menu>
                                <MenuButton as={IconButton} isRound colorScheme='gray' variant={'ghost'}>
                                    <Avatar size={'md'} name={user?.username} src={user?.image} />
                                </MenuButton>
                                <MenuList>
                                    <MenuGroup title='Profile'>
                                        <MenuItem>My Account</MenuItem>
                                        <MenuItem>Payments </MenuItem>
                                    </MenuGroup>
                                    <MenuDivider />
                                    <MenuGroup>
                                        <MenuItem
                                            onClick={() => {
                                                navigate('/login')
                                                sessionStorage.removeItem('token')
                                            }}
                                            as={Button} size={'sm'} color={'red'}>Logout</MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>
                </div>
                {/* nav end */}

                <div className='w-11/12 bg-slate-200 mt-10 h-fit pb-10'>
                    <Outlet />
                </div>


            </div>

        </div>
    )
}

export default AdminDashboard