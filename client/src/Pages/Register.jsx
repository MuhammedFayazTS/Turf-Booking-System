import React, { useState } from 'react'
import {
    Button,
    Stack,
    Radio,
    RadioGroup,
    Image
} from '@chakra-ui/react'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from '../Components/Forms/Formik Components/TextField'
import { Link, useNavigate } from 'react-router-dom'
import { registerAPI } from '../Services/allAPIs'
import toast from 'react-hot-toast'
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from '@heroicons/react/24/solid'


function Register() {

    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass, setShowConfirmPass] = useState(false)

    const registerUser = async (userDetails) => {
        try {
            const response = await registerAPI(userDetails)
            if (response.data.success) {
                toast.success(response.data.message)
                toast.loading("redirecting to login page...", { duration: 2000 })
                navigate('/login') // redirect to login page
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error('Something went wrong!')
        }
    }

    const validate = Yup.object({
        username: Yup.string()
            .max(10, 'Must be 10 characters or less')
            .required('Username is Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required')
    })  //validate end
    return (
        <>
            <div className="grid grid-cols-2">

                <div className="w-full overflow-hidden m-3 hidden md:block 
                bg-cover bg-no-repeat bg-center rounded-md
                bg-[linear-gradient(to_right_bottom,rgba(16,185,129,0.7),rgba(101,163,13,0.7)),url(https://media.istockphoto.com/id/1445090503/photo/kids-team-soccer-or-legs-with-soccer-ball-in-workout-fitness-game-or-exercise-on-nature-park.webp?b=1&s=170667a&w=0&k=20&c=le_PBWyGSTpfLs7OS22jtJp8-esV--6CjcIYHCqqcjk=)]">
                    <div className='flex flex-col justify-end h-full w-full space-y-2 p-8 bg-black/30 text-white'>
                        <span className="text-5xl font-bold">
                            Now you dont have to rely on your designer to create a new page
                        </span>
                        <div className="flex space-x-3 flex-wrap">
                            <span className='inline-flex items-center text-lg font-semibold'>
                                <CheckBadgeIcon className='w-7 h-7 text-green-500' />
                                Easy Booking
                            </span>
                            <span className='inline-flex items-center text-lg font-semibold'>
                                <CheckBadgeIcon className='w-7 h-7 text-green-500' />
                                Easy Booking
                            </span>
                            <span className='inline-flex items-center text-lg font-semibold'>
                                <CheckBadgeIcon className='w-7 h-7 text-green-500' />
                                Easy Booking
                            </span>
                            <span className='inline-flex items-center text-lg font-semibold'>
                                <CheckBadgeIcon className='w-7 h-7 text-green-500' />
                                Easy Booking
                            </span>
                        </div>
                    </div>

                </div>

                <div className='col-span-2 md:col-span-1 flex flex-col w-full h-screen justify-center items-center px-5 md:px-32'>
                    <h2 className="self-start text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
                    <p className="self-start mt-2 text-base text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            title=""
                            className="font-medium text-black transition-all duration-200 hover:underline "
                        >
                            Sign In
                        </Link>
                    </p>

                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            isOwner: false,
                        }} //initial values
                        validationSchema={validate}
                        onSubmit={values => {
                            registerUser(values)
                        }
                        }
                    >
                        {formik => (
                            <Form className='flex flex-col space-y-4 w-full mt-6'>
                                <RadioGroup className='self-center'
                                    name='isOwner' // Add a name to RadioGroup
                                    onChange={(value) => formik.setFieldValue('isOwner', value == '1' ? false : true)} // Set the formik value on change
                                    defaultValue='1'>
                                    <Stack spacing={5} direction='row'>
                                        <Radio colorScheme='whatsapp' value='1'>
                                            I am a User
                                        </Radio>
                                        <Radio colorScheme='whatsapp' value='2'>
                                            I am a Turf Owner
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                                <TextField label='Username' name='username' type='text' />
                                <TextField label='Email' name='email' type='email' />
                                <TextField label='Password' name='password' type={showPass ? 'text' : 'password'} setShow={setShowPass} show={showPass} />
                                <TextField label='Confirm Password' name='confirmPassword' type={showConfirmPass ? 'text' : 'password'} setShow={setShowConfirmPass} show={showConfirmPass} />
                                <Button rightIcon={<ArrowLongRightIcon class="h-6 w-6" />}
                                    colorScheme='whatsapp' type='submit'>Sign Up</Button>

                            </Form>
                        )}
                    </Formik>
                </div>

            </div>

        </>
    )
}



export default Register