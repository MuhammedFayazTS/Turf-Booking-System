import React, { useState } from 'react'
import { Button, Grid, GridItem, Stack } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import TextField from './Formik Components/TextField'
import { amenities, coachTextFieldNames, coaching, includes, textfieldItems, timeOptions } from './InputList'
import CheckBoxControl from './Formik Components/CheckBoxControl'
import TextAreaControl from './Formik Components/TextAreaControl'
import TimingsCheckBoxControl from './Formik Components/TimingsCheckBoxControl'

function CoachRegisterForm() {
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false);
    const [selectedTime, setSelectedTime] = useState('');

    const validate = Yup.object({
        name: Yup.string()
            .max(12, 'Must be 10 characters or less')
            .required('Required'),
        phone: Yup.string()
            .min(10, 'Phone Number Must be 10 numbers')
            .max(10, 'Phone Number Must be 10 numbers')
            .required('Phone number is required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        location: Yup.string()
            .max(15, 'Location must be a maximum of 15 characters')
            .required('Location is required'),
        description: Yup.string()
            .max(255, 'Description must be a maximum of 255 characters')
            .required('Description is required'),
        experience: Yup.string()
            .max(2,'maximum of 2 characters')
            .required('Experience is required'),
        price: Yup.string()
            .min(3, 'Minimum of 100Rs')
            .max(4, 'Maximum of 10000Rs')
            .required('Price is required'),
        coaching: Yup.array()
            .min(1, 'At least one lesson is required')
            .required('Coaching is required'),
        availableTimings: Yup.array()
            .min(1, 'At least one item is required')
            .required('Time is required')
    })  //validate end
    return (
        <div className='w-full'>
            <Formik
                initialValues={{
                    name: '',
                    phone: '',
                    email: '',
                    location: '',
                    experience: '',
                    price: '',
                    coaching: [],
                    availableTimings: [],
                    description: '',
                }} //initial values
                validationSchema={validate}
                onSubmit={values => {
                    console.log("Values:" + JSON.stringify(values));
                }
                }
            >
                {formik => (
                    <div className='w-full p-4 md:p-7 shadow rounded-lg bg-white'>
                        <Form key={'form'} className='flex flex-col space-y-4'>
                            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={6} >
                                {
                                    coachTextFieldNames.map((item, index) => (
                                        <GridItem colSpan={{ base: 2, md: 1 }} w='100%' h='fit-content' >
                                            <TextField key={item.name + index} label={item.label} name={item.name} type={item.type} />
                                        </GridItem>
                                    ))
                                }

                                {/* time menu */}
                                <GridItem w='100%' colSpan={{ base: 2, md: 2 }} h='fit-content' >
                                    <div className='w-full'>
                                        {/* <TimeMenuForForm /> */}
                                        <TimingsCheckBoxControl name='availableTimings' label={'Timings'} data={timeOptions} />
                                    </div>
                                </GridItem>


                                <GridItem w='100%' colSpan={2} h='fit-content' >
                                    {/* includes input checkboxes */}
                                    <CheckBoxControl data={coaching} name='coaching' label={'Coaching'} />
                                </GridItem>

                                <GridItem w='100%' colSpan={2} h='fit-content' >
                                    <TextAreaControl label={'Description'} name='description' />
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

export default CoachRegisterForm