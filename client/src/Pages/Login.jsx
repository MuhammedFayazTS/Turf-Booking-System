import React, { useState } from 'react'
import {
    Button,
} from '@chakra-ui/react'
import toast from 'react-hot-toast'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from '../Components/Forms/Formik Components/TextField'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI } from '../Services/allAPIs'
import { useSelector, useDispatch } from 'react-redux'
import { ArrowLongRightIcon, CheckBadgeIcon } from '@heroicons/react/24/solid'

function Login() {

    const { loading } = useSelector(state => state.alerts)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isSubmitting, setisSubmitting] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const loginUser = async (userDetails) => {
        setisSubmitting(true)
        try {
            const response = await loginAPI(userDetails)
            if (response.data.success) {
                toast.success(response.data.message)
                toast.loading("redirecting to Home page...", { duration: 2000 })
                sessionStorage.setItem('token', response.data.token) //set token is sessionStorage -token is in data object
                setisSubmitting(false)
                navigate('/') // redirect to login page
            } else {
                toast.error(response.data.message)
                setisSubmitting(false)
            }
        } catch (error) {
            toast.error('Something went wrong!')
            setisSubmitting(false)
        }
    }

    const validate = Yup.object({
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    })  //validate end

    return (
        <>
            <div className="grid md:grid-cols-2">
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
                    <h2 className="self-start text-3xl font-bold leading-tight text-black sm:text-4xl">Sign In</h2>
                    <p className="self-start mt-2 text-base text-gray-600">
                        Don't have an account? {' '}
                        <Link
                            to="/register"
                            title=""
                            className="font-medium text-black transition-all duration-200 hover:underline "
                        >
                            Create a free account
                        </Link>
                    </p>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }} //initial values
                        validationSchema={validate}
                        onSubmit={values => {
                            loginUser(values)
                        }
                        }
                    >
                        {formik => (
                            <Form className='flex flex-col space-y-4 w-full mt-6 '>
                                <TextField label='Email' name='email' type='email' />
                                <TextField label='Password' name='password' type={showPass ? 'text' : 'password'} setShow={setShowPass} show={showPass} />
                                <Button
                                    rightIcon={<ArrowLongRightIcon class="h-6 w-6" />}
                                    colorScheme='whatsapp' type='submit' isLoading={isSubmitting}>Sign In</Button>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </>
    )
}

export default Login