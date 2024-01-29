import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect } from 'react'
import { closeModalContext } from '../../Context/CloseModalContext'


function EditModal({...props}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {closeModal,setCloseModal} = useContext(closeModalContext)
    useEffect(()=>{
        onClose()
    },[closeModal])
    return (
        <>
            <Button w={'100%'} variant={'ghost'} colorScheme='twitter' rightIcon={<PencilSquareIcon className="h-5 w-5" />
}
             onClick={onOpen}>Edit</Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                        {props.children}
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditModal