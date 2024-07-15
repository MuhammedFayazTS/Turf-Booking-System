import React, { useState } from 'react';
import { Button, Stack, Radio, RadioGroup, Image, useSteps, Box, Avatar, FormLabel } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '../Forms/Formik Components/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../../Services/allAPIs';
import toast from 'react-hot-toast';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import Stepper from '../content/Stepper';
import FileUpload from '../core/FileUpload';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../redux/userSlice';

function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);

  const steps = [
    { title: 'First', description: 'User info' },
    { title: 'Second', description: 'Profile Image' },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const nextStep = () => setActiveStep(activeStep + 1);
  const prevStep = () => setActiveStep(activeStep - 1);

  const validate = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(12, 'Username must be 12 characters or less')
      .required('Username is Required'),
    phone: Yup.string()
      .min(8, 'Phone number must be at least 8 numbers')
      .max(15, 'Maximum length of phone number is 15')
      .required('Phone number is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    role: Yup.mixed().oneOf(['owner', 'user']).required('User type is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(30, 'Maximum allowed length for password is 30')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password must match')
      .required('Confirm password is required'),
    image: Yup.mixed()
      .test('fileSize', 'File size is too large', (value) => {
        if (!value) return true; // If no image, skip size validation
        return value.size <= 10485760; // 10 MB
      })
      .test('fileType', 'Unsupported file format', (value) => {
        if (!value) return true; // If no image, skip type validation
        return ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(value.type);
      }),
  });

  const handleSignUp = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      values[key] !== undefined && formData.append(key, values[key]);
    });
    const actionResult = await dispatch(signUp(formData));

    if (signUp.fulfilled.match(actionResult)) {
      // Navigate on success
      toast.success('Sign up successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/sign-in');
      }, 2000);
    } else {
      // Handle errors
      toast.error(actionResult.payload.message || 'Sign up failed!');
    }
  };

  return (
    <>
      <div className="grid grid-cols-2">
        <div
          className="w-full overflow-hidden m-3 hidden md:block
                bg-cover bg-no-repeat bg-center rounded-md
                bg-[linear-gradient(to_right_bottom,rgba(16,185,129,0.7),rgba(101,163,13,0.7)),url(https://media.istockphoto.com/id/1445090503/photo/kids-team-soccer-or-legs-with-soccer-ball-in-workout-fitness-game-or-exercise-on-nature-park.webp?b=1&s=170667a&w=0&k=20&c=le_PBWyGSTpfLs7OS22jtJp8-esV--6CjcIYHCqqcjk=)]"
        >
          <div className="flex flex-col justify-end h-full w-full space-y-2 p-8 bg-black/30 text-white">
            <span className="text-5xl font-bold">Now you don't have to rely on your designer to create a new page</span>
            <div className="flex space-x-3 flex-wrap">
              <span className="inline-flex items-center text-lg font-semibold">
                <CheckBadgeIcon className="w-7 h-7 text-green-500" />
                Easy Booking
              </span>
              {/* Additional features */}
            </div>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 flex flex-col w-full h-screen justify-center items-center px-5 md:px-32">
          <h2 className="self-start text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
          <p className="self-start mt-2 text-base text-gray-600">
            Already have an account?{' '}
            <Link
              to="/sign-in"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline "
            >
              Sign In
            </Link>
          </p>

          <Formik
            initialValues={{
              username: '',
              phone: '',
              email: '',
              password: '',
              confirmPassword: '',
              role: 'user',
              image: undefined,
            }}
            validationSchema={validate}
            onSubmit={handleSignUp}
          >
            {(formik) => (
              <Form className="flex flex-col space-y-4 w-full mt-6">
                <Box>
                  <Stepper
                    activeStep={activeStep}
                    steps={steps}
                    setActiveStep={setActiveStep}
                    stepComponents={[
                      <MainForm
                        showPass={showPass}
                        showConfirmPass={showConfirmPass}
                        setShowPass={setShowPass}
                        setShowConfirmPass={setShowConfirmPass}
                        formik={formik}
                      />,
                      <AvatarUpload image={formik.values.image} setFieldValue={formik.setFieldValue} />,
                    ]}
                  />
                </Box>

                <Stack direction={'row'}>
                  <Button onClick={prevStep} isDisabled={activeStep === 0} flex={1} mr={2}>
                    Previous
                  </Button>
                  <Button onClick={nextStep} isDisabled={activeStep === steps.length - 1} flex={1}>
                    Next
                  </Button>
                </Stack>
                {!(activeStep !== steps.length - 1) && (
                  <Button
                    rightIcon={<ArrowLongRightIcon className="h-6 w-6" />}
                    isLoading={loading}
                    colorScheme="whatsapp"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default SignUp;

function AvatarUpload({ image, setFieldValue }) {
  return (
    <Stack alignItems={'center'}>
      {image && <Avatar size="2xl" src={URL.createObjectURL(image)} />}
      <FileUpload
        name="image"
        placeholder="Upload your file"
        acceptedFileTypes="image/*"
        isDropZone={false}
        setFieldValue={setFieldValue}
        maxSize={1048576}
      >
        Upload File
      </FileUpload>
      <RadioGroup
        width={'100%'}
        className="self-center"
        name="role"
        onChange={(value) => setFieldValue('role', value)} // Ensure you're setting the role correctly
        defaultValue="user"
      >
        <FormLabel>
          User Type
          <Stack mt={3} spacing={5} direction="row">
            <Radio colorScheme="whatsapp" value="user">
              I am a User
            </Radio>
            <Radio colorScheme="whatsapp" value="owner">
              I am a Turf Owner
            </Radio>
          </Stack>
        </FormLabel>
      </RadioGroup>
    </Stack>
  );
}

const MainForm = ({ formik, showPass, setShowPass, showConfirmPass, setShowConfirmPass }) => {
  return (
    <>
      <TextField label="Username" placeholder="john_doe" name="username" type="text" />
      <TextField label="Phone" placeholder="0123456789" name="phone" type="number" />
      <TextField label="Email" placeholder="johndoe@mail.com" name="email" type="email" />
      <TextField
        label="Password"
        name="password"
        placeholder="********"
        type={showPass ? 'text' : 'password'}
        setShow={setShowPass}
        show={showPass}
        showProtectedText={true}
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        placeholder="********"
        type={showConfirmPass ? 'text' : 'password'}
        setShow={setShowConfirmPass}
        show={showConfirmPass}
        showProtectedText={true}
      />
    </>
  );
};
