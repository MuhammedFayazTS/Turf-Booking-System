import { Badge, IconButton, MenuButton, MenuList, Menu, MenuItem, Portal } from '@chakra-ui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { getUserInfoById } from '../../Services/allAPIs'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/alertSlice'

function BookingSummaryTable({ data,isAdminPage }) {
    const dispatch = useDispatch()
    const [userDetails, setUserDetails] = useState({});

    // for color according to status
    const setColorByStatus = (status) => {
        if (status == 'success') {
            return 'green'
        } else if (status == 'failed') {
            return 'red'
        } else {
            return 'yellow'
        }
    }

    const fetchUserDetails = async (id) => {
        dispatch(showLoading());
        try {
            const response = await getUserInfoById(id);
            dispatch(hideLoading());
            if (response.data.success) {
                setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    [id]: response.data.data.user?.username,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        data.forEach((venue) => {
            fetchUserDetails(venue.userId);
        });
    }, [data]);

    return (
        <div>
            <table className=" w-full text-sm text-left rtl:text-right text-slate-500 shadow-md border">
                <thead className={`text-xs uppercase  text-slate-200 ${isAdminPage?'bg-green-500':'bg-green-800'}`}>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            User Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Booking Info
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date & Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Payment
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Options
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.length > 0 && data.map((venue, index) => (
                            <tr key={index} className="bg-white border hover:bg-slate-50 transition-colors ease-in-out ">
                                <td className="px-6 py-4 font-bold text-slate-800">
                                    {userDetails[venue.userId]}
                                </td>
                                <td className="px-6 py-4">
                                    {venue.venueInfo?.name},
                                    {venue?.sport}
                                </td>
                                <td className="px-6 py-4">
                                    <ul>
                                        <li>
                                            {venue?.date},
                                        </li>
                                        <li>
                                            {venue?.time}
                                        </li>
                                    </ul>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <Badge colorScheme={setColorByStatus(venue?.status)} py={1} px={2}>{venue?.status}</Badge>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <Menu>
                                        <MenuButton as={IconButton} isRound variant={'solid'} colorScheme='gray'
                                            icon={<EllipsisHorizontalIcon className='h-5 w-5' />}>
                                            {/* Actions */}
                                        </MenuButton>
                                        <Portal>
                                            <MenuList>
                                                <MenuItem>Download</MenuItem>
                                                <MenuItem>Create a Copy</MenuItem>
                                                <MenuItem>Mark as Draft</MenuItem>
                                            </MenuList>
                                        </Portal>
                                    </Menu>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    )
}

export default BookingSummaryTable