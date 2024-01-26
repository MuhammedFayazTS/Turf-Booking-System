import { BanknotesIcon, BellIcon, BuildingStorefrontIcon, ChartPieIcon, DocumentCheckIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import {  useNavigate } from 'react-router-dom';


function SidebarComponent({ collapsed }) {
    const navigate = useNavigate()

    return (
        <>
            <Sidebar
                collapsed={collapsed}
                transitionDuration={500}
                className='h-full top-auto'
                breakPoint='md'
                collapsedWidth="70px"
                backgroundColor='#fefefe'
            >
                <Menu
                    menuItemStyles={{
                        button: {

                            [`&.active`]: {
                                backgroundColor: 'red',
                                color: 'white',
                            },
                        },
                    }}
                >
                    <MenuItem onClick={() => navigate('/admin')} active icon={<HomeIcon  className="h-6 w-6 text-gray-800" />
                    } >
                        Home
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/admin/notifications')} active icon={<BellIcon className="h-6 w-6 text-gray-800" />
                    } >
                        Notification
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/admin/bookings')} active icon={<DocumentCheckIcon  className="h-6 w-6 text-gray-800" />
                    } >
                        Bookings
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/admin/revenue')} active icon={<BanknotesIcon     className="h-6 w-6 text-gray-800" />
                    } >
                        Revenue
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/admin/user-management')} active icon={<UserIcon     className="h-6 w-6 text-gray-800" />
                    } >
                        User Mangement
                    </MenuItem>
                    <MenuItem onClick={() => navigate('/admin/venue-management')} active icon={<BuildingStorefrontIcon      className="h-6 w-6 text-gray-800" />
                    } >
                        Venue Mangement
                    </MenuItem>
                </Menu>
            </Sidebar>
        </>
    )
}

export default SidebarComponent