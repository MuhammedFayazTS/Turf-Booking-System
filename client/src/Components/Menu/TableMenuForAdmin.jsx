import { IconButton, MenuButton, MenuList, Portal, Menu, MenuItem } from '@chakra-ui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import React from 'react'
import EditModal from '../Modals/EditModal'
import DeleteModal from '../Modals/DeleteModal'

function TableMenuForAdmin({ editModalContent, deleteModalContent, ...props }) {
    return (
        <>
            <Menu>
                <MenuButton
                    as={IconButton}
                    isRound
                    aria-label='Options'
                    icon={<EllipsisHorizontalIcon className="h-7 w-7" />}
                    variant='outline'
                />
                <Portal>
                    <MenuList>
                        {
                            !props.isNotEditable &&
                            <MenuItem px={0} >
                                <EditModal >
                                    {editModalContent}
                                </EditModal>
                            </MenuItem>
                        }
                        <MenuItem px={0} >
                            <DeleteModal >
                                {deleteModalContent}
                            </DeleteModal>
                        </MenuItem>
                    </MenuList>
                </Portal>
            </Menu>
        </>
    )
}

export default TableMenuForAdmin