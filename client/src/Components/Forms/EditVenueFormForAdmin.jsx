import React, { useContext } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Button, Grid, GridItem, ModalBody, ModalFooter, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import TextField from './Formik Components/TextField'
import { useDispatch } from 'react-redux'
import { closeModalContext } from '../../Context/CloseModalContext'
import { editVenueByAdminAPI } from '../../Services/allAPIs'
import toast from 'react-hot-toast'
import { addVenues } from '../../redux/adminSlice'

function EditVenueFormForAdmin({ data }) {

    const dispatch = useDispatch()
    const { closeModal, setCloseModal } = useContext(closeModalContext)
    const updateVenueInfo = async (venueData) => {
        try {
            const response = await editVenueByAdminAPI(venueData)
            if (response.data.success) {
                toast.success(response.data.message)
                dispatch(addVenues(response.data.venues))
            }
            setCloseModal(!closeModal)
        } catch (error) {
            toast.error("Error updating venue information")
            console.log(error.message)
            setCloseModal(!closeModal)
        }
    }

    const validate = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Username is Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        location: Yup.string()
            .required('Location is required'),
        phone: Yup.string()
            .min(10, 'Must be at least 10 number')
            .max(10, 'Must be a maximum of 10 number')
            .required('Phone is required'),
        price: Yup.number()
            .min(600, 'must be minimum 600')
            .required('Price is required'),
    })  //validate end
    return (
        <>
            <Formik
                initialValues={{
                    name: data.name || '',
                    email: data.email || '',
                    location: data.location || '',
                    phone: data.phone || '',
                    price: data.price || 0,
                }} //initial values
                validationSchema={validate}
                onSubmit={values => {
                    Object.assign(values, { id: data._id })
                    updateVenueInfo(values)
                }
                }
            >
                {formik => (
                    <Form className='flex flex-col'>
                        <ModalBody pb={3}>
                            {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium architecto vero ab minus dolores pariatur? Quas qui aliquid perspiciatis quasi placeat, magnam ab tempore eaque consectetur voluptate asperiores voluptatibus perferendis?</p> */}
                            <Grid templateColumns={'repeat(1, 1fr)'} gap={2}>
                                <GridItem w='100%' h='fit-content' >
                                    <TextField label='Name' name='name' type='text' />
                                </GridItem>
                                <GridItem w='100%' h='fit-content' >
                                    <TextField label='Email' name='email' type='email' />
                                </GridItem>
                                <GridItem w='100%' h='fit-content' >
                                    <TextField label='Location' name='location' type='text' />
                                </GridItem>
                                <GridItem w='100%' h='fit-content' >
                                    <TextField label='Phone' name='phone' type='number' />
                                </GridItem>
                                <GridItem w='100%' h='fit-content' >
                                    <TextField label='Price' name='price' type='number' />
                                </GridItem>
                            </Grid>

                            <ModalFooter gap={2} justifyContent={'center'}>
                                <Button type='submit' colorScheme='green'>Update</Button>
                                <Button colorScheme='blackAlpha'>Default</Button>
                            </ModalFooter>
                        </ModalBody>

                    </Form>
                )}
            </Formik>
        </>
    )
}

export default EditVenueFormForAdmin