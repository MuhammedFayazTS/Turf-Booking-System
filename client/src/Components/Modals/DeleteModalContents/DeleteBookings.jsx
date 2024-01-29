import { Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { addBookings } from '../../../redux/adminSlice'
import { removeBookingByAdminAPI } from '../../../Services/allAPIs'
import { closeModalContext } from '../../../Context/CloseModalContext'


function DeleteBookings({data}) {

    const dispatch = useDispatch()
    const {closeModal,setCloseModal} = useContext(closeModalContext) //for modal close


    const removeBooking = async(id) =>{
        try {
            const response = await removeBookingByAdminAPI(id)
            if(response.data.success) {
                toast.success(response.data.message)
                setCloseModal(!closeModal)
                dispatch(addBookings(response.data.bookings))
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
            setCloseModal(!closeModal)
        }
    }

  return (
    <>
        <ModalContent>
                    <ModalHeader>Delete Booking</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        Are you sure you want to delete {data?.venueInfo?.name} booking.
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={(e)=>removeBooking(data._id)} colorScheme='red' mr={3}>
                            Delete
                        </Button>
                        {/* <Button onClick={onClose}>Cancel</Button> */}
                    </ModalFooter>
                </ModalContent>
    </>
  )
}

export default DeleteBookings