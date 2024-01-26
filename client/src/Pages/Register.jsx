import React from 'react'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Card,
    CardBody,
    CardHeader,
    Button,
    Stack,
    Radio,
    RadioGroup
} from '@chakra-ui/react'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import TextField from '../Components/Forms/Formik Components/TextField'
import { useNavigate } from 'react-router-dom'
import { registerAPI } from '../Services/allAPIs'
import toast from 'react-hot-toast'

function Register() {

    const navigate=useNavigate()

    const registerUser = async (userDetails) =>{
        try { 
        const response = await registerAPI(userDetails)
        if(response.data.success){
            toast.success(response.data.message)
            toast.loading("redirecting to login page...",{duration: 2000})
            navigate('/login') // redirect to login page
        }else{
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
        // phone: Yup.number()
        //     .min('Phone number should be 10 numbers')
        //     .max('Phone number should be 10 numbers')
        //     .required('Phone number is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match')
            .required('Confirm password is required'),
        otp: Yup.string()
        .required('OTP is required')
    })  //validate end
    return (
        <>
            <div className='flex w-full h-screen justify-center items-center bg-green-600'>
                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        // phone: '',
                        password: '',
                        confirmPassword: '',
                        otp:'',
                        isOwner:false,
                    }} //initial values
                    validationSchema={validate}
                    onSubmit={values=>{
                        registerUser(values)
                    }
                    }
                >
                    {formik => (
                        <div className='bg-green-50 w-1/3 p-6 rounded-lg shadow-xl'>
                            <h4 className="antialiased hover:subpixel-antialiased text-gray-700 font-extrabold  text-2xl text-center mb-5">
                            Get started with <span className='text-green-600'>SportSpotter</span>
                            </h4>
                            <Form className='flex flex-col space-y-4'>
                                <RadioGroup className='self-center'
                                name='isOwner' // Add a name to RadioGroup
                                onChange={(value) => formik.setFieldValue('isOwner', value =='1'?false:true)} // Set the formik value on change
                                defaultValue='1'>
                                    <Stack spacing={5} direction='row'>
                                        <Radio colorScheme='green' value='1'>
                                            I am a User
                                        </Radio>
                                        <Radio colorScheme='green' value='2'>
                                            I am a Turf Owner
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                                <TextField label='Username' name='username' type='text' />
                                <TextField label='Email' name='email' type='email' />
                                {/* <TextField label='Phone' name='phone' type='number' /> */}
                                <TextField label='Password' name='password' type='password' />
                                <TextField label='Confirm Password' name='confirmPassword' type='password' />
                                <TextField label='OTP' name='otp' type='text' />
                                <Button colorScheme='green' type='submit'>Sign Up</Button>
                                
                            </Form>
                            <p className='text-center text-gray-500 mt-2'>already a user?
                            <Button type='button' onClick={()=>navigate('/login')} variant='link' colorScheme='green'>login</Button>
                            </p>
                        </div>
                    )}
                </Formik>
            </div>
        </>
    )
}



export default Register