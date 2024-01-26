import React, { useState } from 'react'
import { Button, Grid, GridItem,Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import TextField from './Formik Components/TextField'
import { amenities, includes, textfieldItems, timeOptions } from './InputList'
import CheckBoxControl from './Formik Components/CheckBoxControl'
import TextAreaControl from './Formik Components/TextAreaControl'
import TimingsCheckBoxControl from './Formik Components/TimingsCheckBoxControl'
import { venueRegisterAPI } from '../../Services/allAPIs'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'


function VenueRegisterForm() {
    const navigate=useNavigate()
    const { user } = useSelector(state => state.user)


    const registerVenue = async (venueDetails) =>{
        try { 
        const response = await venueRegisterAPI(venueDetails)
        if(response.data.success){
            toast.success(response.data.message)
            navigate('/venue-list') // redirect to venue-list
        }else{
            toast.error(response.data.message)
        }
    } catch (error) {
            toast.error('Something went wrong!')
        }
    }

    const validate = Yup.object({
        name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        phone: Yup.string()
            .min(10, 'Phone Number Must be 10 numbers')
            .max(10, 'Phone Number Must be 10 numbers')
            .required('Phone number is required'),
        pitches: Yup.number()
            .min(1, 'Minimum number must be 1')
            .max(10, 'Maximum number must be 10')
            .required('Number of pitches is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        location: Yup.string()
            .max(15, 'Location must be a maximum of 15 characters')
            .required('Location is required'),
        overview: Yup.string()
            .max(255, 'Overview must be a maximum of 255 characters')
            .required('Overview is required'),
        price: Yup.number()
            .min(100, 'Minimum of 100Rs')
            .max(10000, 'Maximum of 10000Rs')
            .required('Price is required'),
        lightsOn: Yup.number()
            .min(100, 'Minimum of 100Rs')
            .max(999, 'Maximum of 999Rs')
            .notRequired(),        
        include: Yup.array()
            .min(1, 'At least one item is required')
            .required('Includes is required'),
        amenities: Yup.array()
            .min(1, 'At least one item is required')
            .required('Amenities is required'),
        availableTimings: Yup.array()
            .min(1, 'At least one item is required')
            .required('Includes is required')
    })  //validate end
    return (
        <div className='w-full'>
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    email: '',
                    location: '',
                    pitches: 0,
                    overview: '',
                    include: [],
                    amenities: [],
                    price: 0,
                    lightsOn: 0,
                    availableTimings: [],
                }} //initial values
                validationSchema={validate}
                onSubmit={values => {
                    values.userId = user._id
                    registerVenue(values)
                    // console.log("Values:" + JSON.stringify(values));
                }
                }
            >
                {formik => (
                    <div className='w-full p-4 md:p-7 shadow rounded-lg bg-white'>
                        <Form key={'form'} className='flex flex-col space-y-4'>
                            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6} >
                                {
                                    textfieldItems.map((item, index) => (
                                        <GridItem colSpan={{ base: 2, md: 1 }} w='100%' h='fit-content' >
                                            <TextField key={item.name + index} label={item.label} name={item.name} type={item.type} />
                                        </GridItem>
                                    ))
                                }


                                <GridItem w='100%' h='fit-content' colSpan={{ base: 2, md: 1 }} >
                                    <Stack direction={'row'} spacing={1}>
                                        <TextField name='price' label={'Price'} type={'number'} />
                                        <TextField name='lightsOn' label={'Lights On'} type={'number'} />
                                    </Stack>
                                </GridItem>

                                {/* time menu */}
                                <GridItem w='100%' colSpan={{ base: 2, md: 2 }} h='fit-content' >
                                    <div className='w-full '>
                                        {/* <TimeMenuForForm /> */}
                                        <TimingsCheckBoxControl name='availableTimings' label={'Timings'} data={timeOptions} />
                                    </div>
                                </GridItem>


                                <GridItem w='100%' colSpan={2} h='fit-content' >
                                    {/* includes input checkboxes */}
                                    <CheckBoxControl data={includes} name='include' label={'Includes'} />
                                </GridItem>

                                <GridItem w='100%' colSpan={2} h='fit-content' >
                                    {/* amenities input checkboxes */}
                                    <CheckBoxControl data={amenities} name={'amenities'} label={'Amenities'} />
                                </GridItem>

                                <GridItem w='100%' colSpan={2} h='fit-content' >
                                    <TextAreaControl  label='Overview' name='overview' />
                                </GridItem>



                            </Grid>

                            <Button colorScheme='green' type='submit'>Apply</Button>

                        </Form>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default VenueRegisterForm