import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'

function DeleteModal({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button w={'100%'} colorScheme='red' variant={'ghost'} rightIcon={<TrashIcon className='w-5 h-5' />}
                onClick={onOpen}>Delete</Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                {children}
            </Modal>
        </>
    )
}

export default DeleteModal