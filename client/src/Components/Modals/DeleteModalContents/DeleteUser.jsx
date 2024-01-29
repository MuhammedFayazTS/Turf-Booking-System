import { Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { addUsers } from '../../../redux/adminSlice'
import { removeUserByAdminAPI } from '../../../Services/allAPIs'
import { closeModalContext } from '../../../Context/CloseModalContext'


function DeleteUser({ data }) {

    const dispatch = useDispatch()
    const { closeModal, setCloseModal } = useContext(closeModalContext) //for modal close


    const removeUser = async (id) => {
        try {
            const response = await removeUserByAdminAPI(id)
            if (response.data.success) {
                toast.success(response.data.message)
                setCloseModal(!closeModal)
                dispatch(addUsers(response.data.users))
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
                <ModalHeader>Delete User</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    Are you sure you want to delete {data?.username}.
                </ModalBody>

                <ModalFooter>
                    <Button onClick={(e) => removeUser(data._id)} colorScheme='red' mr={3}>
                        Delete
                    </Button>
                    {/* <Button onClick={onClose}>Cancel</Button> */}
                </ModalFooter>
            </ModalContent>
        </>
    )
}

export default DeleteUser