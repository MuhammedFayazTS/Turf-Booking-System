import { Avatar, Button, FormLabel, Grid, GridItem, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import React, { useEffect, useRef, useState } from 'react'
import TextField from '../Forms/Formik Components/TextField'
import { useDispatch, useSelector } from 'react-redux'
import { editUserInfoAPI } from '../../Services/allAPIs'
import toast from 'react-hot-toast'
import { setUser } from '../../redux/userSlice'

function EditProfile() {

    const [profilePic, setProfilePic] = useState('')
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const fileInputRef = useRef(null);
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleChangeImage = (e) => {
        let img = URL.createObjectURL(e.target.files[0])
        setProfilePic(img)
    };

    const editUserProfile = async(body)=>{
        try {
            const response = await editUserInfoAPI(body)
            if(response.data.success){
                dispatch(setUser(response.data.data))
                return toast.success(response.data.message);
            }
            else{
                return toast.error("Error in editing user profile");
            }
        } catch (error) {
            toast.error("Error in editing user profile");
            console.log(error.message)
        }
    }


    const validate = Yup.object({
        username: Yup.string()
            .max(10, 'Must be 10 characters or less')
            .required('Username is Required'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
    })  //validate end

    useEffect(() => {
        setProfilePic(user?.image)
    }, [user])
    return (
        <>
            {
                user ?
                    <div className='p-4 md:p-8'>
                        <Formik
                            initialValues={{
                                username: user?.username || '', // Set user.username as initial value
                                email: user?.email || '',
                                isOwner: false,
                            }} //initial values
                            validationSchema={validate}
                            onSubmit={values => {
                                editUserProfile(values)
                            }
                            }
                        >
                            {formik => (
                                <Form className='flex flex-col space-y-4'>
                                    <Grid templateColumns={{base:'repeat(1, 1fr)',md:'repeat(3, 1fr)'}} gap={6}>
                                        <GridItem colSpan={{base:1,md:3}}  w='100%' h='fit-content' mt={3} >
                                            <h2 className="text-2xl font-semibold text-gray-600 text-center md:text-left">Edit Your Profile</h2>
                                        </GridItem>
                                        <GridItem colSpan={{base:1,md:1}}  rowSpan={{base:1,md:4}} w='100%' h='fit-content' className='flex flex-col items-center space-y-4'>
                                            <Avatar w={300} h={300} src={profilePic} />
                                            <FormLabel>
                                                <Button colorScheme='blackAlpha' variant={'ghost'} onClick={() => handleButtonClick()}>
                                                    Change Image
                                                </Button>
                                                <Input
                                                    onChange={handleChangeImage}
                                                    type='file'
                                                    accept='image/png, image/jpg, image/jpeg'
                                                    ref={fileInputRef}
                                                    style={{ display: 'none' }}
                                                />
                                            </FormLabel>
                                        </GridItem>
                                        <GridItem colSpan={{base:1,md:2}}  w='100%' h='fit-content' >
                                            <TextField label='Username' name='username' type='text' />
                                        </GridItem>
                                        <GridItem colSpan={{base:1,md:2}} w='100%' h='fit-content' >
                                            <TextField label='Email' name='email' type='email' />
                                        </GridItem>
                                        <GridItem colSpan={{base:1,md:2}}  w='100%' h='fit-content' >
                                            <RadioGroup className='self-center'
                                                name='isOwner' // Add a name to RadioGroup
                                                onChange={(value) => formik.setFieldValue('isOwner', value == '1' ? false : true)} // Set the formik value on change
                                                defaultValue={user.isOwner ? '2' : '1'} >
                                                <Stack spacing={5} direction='row'>
                                                    <Radio colorScheme='green' value='1'>
                                                        I am a User
                                                    </Radio>
                                                    <Radio colorScheme='green' value='2'>
                                                        I am a Turf Owner
                                                    </Radio>
                                                </Stack>
                                            </RadioGroup>
                                        </GridItem>
                                        <GridItem colSpan={{base:1,md:2}}  w='100%' h='fit-content' >
                                            <Button type='submit' colorScheme='green'>Update</Button>
                                        </GridItem>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    :
                    <div>
                        Loading your data...
                    </div>
            }
        </>
    )
}

export default EditProfile