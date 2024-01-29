import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button, Grid, GridItem, ModalBody, ModalFooter, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import TextField from './Formik Components/TextField'
import { editUserByAdminAPI } from '../../Services/allAPIs'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { addUsers } from '../../redux/adminSlice'
import { closeModalContext } from '../../Context/CloseModalContext'


function EditUserFormForAdmin({ data }) {
    const dispatch = useDispatch()
    const {closeModal,setCloseModal} = useContext(closeModalContext)
    const updateUserInfo = async (userData) => {
        try {
            const response = await editUserByAdminAPI(userData)
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(addUsers(response.data.users))
            }
            setCloseModal(!closeModal)
        } catch (error) {
            toast.error("Error updating user")
            console.log(error.message)
            setCloseModal(!closeModal)
        }
    }

    const validate = Yup.object({
        username: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Username is Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
    })  //validate end
    return (
        <>
            <Formik
                initialValues={{
                    username: data.username || '',
                    email: data.email || '',
                    isOwner: data.isOwner || false,
                }} //initial values
                validationSchema={validate}
                onSubmit={values => {
                    Object.assign(values, { id: data._id })
                    updateUserInfo(values)
                }
                }
            >
                {formik => (
                    <Form className='flex flex-col space-y-4'>
                        <ModalBody pb={6}>
                            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium architecto vero ab minus dolores pariatur? Quas qui aliquid perspiciatis quasi placeat, magnam ab tempore eaque consectetur voluptate asperiores voluptatibus perferendis?</p> */}
                            <Grid templateColumns={'repeat(1, 1fr)'} gap={6}>
                                <GridItem w='100%' h='fit-content' >
                                    <TextField  label='Username' name='username' type='text' />
                                </GridItem>
                                <GridItem w='100%' h='fit-content' >
                                    <TextField  label='Email' name='email' type='email' />
                                </GridItem>
                                <GridItem w='100%' h='fit-content' >
                                    <RadioGroup className='self-center'
                                        name='isOwner' // Add a name to RadioGroup
                                        onChange={(value) => formik.setFieldValue('isOwner', value == '1' ? false : true)} // Set the formik value on change
                                        defaultValue={data.isOwner?'2':'1'} >
                                        <Stack spacing={5} justifyContent={'center'} direction='row'>
                                            <Radio colorScheme='green' value='1'>
                                                Is a User
                                            </Radio>
                                            <Radio colorScheme='green' value='2'>
                                                Is a Turf Owner
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                </GridItem>
                            </Grid>

                            <ModalFooter gap={2} justifyContent={'center'}>
                                <Button type='submit' colorScheme='green'>Update</Button>
                                <Button onClick={()=>setCloseModal(!closeModal)} colorScheme='blackAlpha'>Close</Button>
                            </ModalFooter>
                        </ModalBody>

                    </Form>
                )}
            </Formik>
        </>
    )
}

export default EditUserFormForAdmin