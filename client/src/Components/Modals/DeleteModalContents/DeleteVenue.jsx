import { Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { addUsers, addVenues } from '../../../redux/adminSlice'
import { removeVenueByAdminAPI } from '../../../Services/allAPIs'
import { closeModalContext } from '../../../Context/CloseModalContext'


function DeleteVenue({ data }) {

    const dispatch = useDispatch()
    const { closeModal, setCloseModal } = useContext(closeModalContext) //for modal close


    const removeVenue = async (id) => {
        try {
            const response = await removeVenueByAdminAPI(id)
            if (response.data.success) {
                toast.success(response.data.message)
                setCloseModal(!closeModal)
                dispatch(addVenues(response.data.venues))
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
                <ModalHeader>Delete Venues</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    Are you sure you want to delete {data?.name}.
                </ModalBody>

                <ModalFooter>
                    <Button onClick={(e) => removeVenue(data._id)} colorScheme='red' mr={3}>
                        Delete
                    </Button>
                    {/* <Button onClick={onClose}>Cancel</Button> */}
                </ModalFooter>
            </ModalContent>
        </>
    )
}

export default DeleteVenue