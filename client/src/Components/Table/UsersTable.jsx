import React from 'react'
import { Badge, IconButton, Image } from '@chakra-ui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import moment from 'moment'
import TableMenuForAdmin from '../Menu/TableMenuForAdmin'
import EditUserFormForAdmin from '../Forms/EditUserFormForAdmin'
import { useSelector } from 'react-redux'
import DeleteUser from '../Modals/DeleteModalContents/DeleteUser'

function UsersTable({ data, isOwnerTable }) {

    const { user } = useSelector(state => state.user)

    return (
        <>
            <motion.div
                initial={{ scale: .85, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: .4, type: 'spring' }} viewport={{ once: true }}
            >
                <table className=" w-full text-sm text-left rtl:text-right text-slate-500 shadow-md border">
                    <thead className={`text-xs uppercase  text-slate-200 bg-green-500 `}>
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                {isOwnerTable ? 'Owner Name' : 'User Name'}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Join Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.length > 0 &&
                            data.map((singleUser, index) => (
                                <tr key={index} className="bg-white border hover:bg-slate-100 transition-colors ease-in-out ">
                                    <td scope="row" className="flex flex-col  md:flex-row md:items-center gap-y-2 px-6 py-4 text-slate-900 whitespace-nowrap dark:text-white">
                                        <Image
                                            boxSize='60px'
                                            objectFit='cover'
                                            src={singleUser?.image ? singleUser?.image : 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'}
                                            alt={singleUser?.username}
                                        />
                                        <div className="md:ps-3">
                                            <div className="text-base font-semibold text-slate-700">
                                                {singleUser?.username}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {singleUser?.email}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {singleUser?.isOwner ? 'Owner' : 'User'}
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {moment(singleUser?.createdAt).format('DD-MM-YYYY')}
                                    </td>
                                    <td className="px-6 py-4">
                                        {
                                            user?.isAdmin ?
                                                <TableMenuForAdmin
                                                    editModalContent={<EditUserFormForAdmin data={singleUser} />}
                                                    deleteModalContent={<DeleteUser data={singleUser} />}
                                                />
                                                :
                                                <IconButton isRound variant={'solid'} colorScheme='gray' >
                                                    <EllipsisHorizontalIcon className="h-7 w-7" />
                                                </IconButton>
                                        }
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </motion.div>
        </>
    )
}

export default UsersTable