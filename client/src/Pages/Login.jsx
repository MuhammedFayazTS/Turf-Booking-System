import React, { useState } from 'react'
import {
    Button,
} from '@chakra-ui/react'
import toast from 'react-hot-toast'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from '../Components/Forms/Formik Components/TextField'
import { useNavigate } from 'react-router-dom'
import { loginAPI } from '../Services/allAPIs'
import { useSelector,useDispatch } from 'react-redux'

function Login() {

    const {loading} = useSelector(state=>state.alerts)
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
                toast.loading("redirecting to Home page...",{duration: 2000})
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
            <div className='flex w-full h-screen justify-center items-center bg-green-600'>
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
                        <div className='bg-green-50 w-1/3 p-6 rounded-lg shadow-xl'>
                            <h4 className="antialiased hover:subpixel-antialiased text-gray-700 font-extrabold  text-2xl text-center mb-5">
                                Welcome back to <span className='text-green-600'>SportSpotter</span>
                            </h4>
                            <Form className='flex flex-col space-y-4'>
                                <TextField label='Email' name='email' type='email' />
                                <TextField label='Password' name='password' type={showPass?'text':'password'} setShow={setShowPass} show={showPass} />
                                <Button colorScheme='green' type='submit'  isLoading={isSubmitting}>Sign In</Button>
                            </Form>
                            <p className='text-center text-gray-500 mt-2'>already a user?
                                <Button type='button' onClick={() => navigate('/register')} variant='link' colorScheme='green'  >Sign up</Button>
                            </p>
                        </div>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default Login