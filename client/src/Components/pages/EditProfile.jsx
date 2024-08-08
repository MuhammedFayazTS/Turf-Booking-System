import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  ButtonGroup,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../Forms/Formik Components/TextField';

const validationSchema = Yup.object({
  username: Yup.string().max(10, 'Must be 10 characters or less').required('Username is Required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
});

function EditProfile() {
  const [profilePic, setProfilePic] = useState('');
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const fileInputRef = useRef(null);

  useEffect(() => {
    setProfilePic(user?.image || '');
  }, [user]);

  const handleButtonClick = () => fileInputRef.current?.click();

  const handleChangeImage = (e) => {
    if (e.target.files?.[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async (values) => {
    console.log('Values: ', values);
  };

  if (!user) {
    return <div>Loading your data...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <Formik
        initialValues={{
          username: user?.username || '',
          email: user?.email || '',
          role: user?.role || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
              <GridItem colSpan={{ base: 1, md: 3 }} w="100%" h="fit-content" mt={3}>
                <h2 className="text-2xl font-semibold text-gray-600 text-center md:text-left">Update Your Profile</h2>
              </GridItem>

              <GridItem
                colSpan={{ base: 1, md: 1 }}
                rowSpan={{ base: 1, md: 4 }}
                w="100%"
                h="fit-content"
                className="flex flex-col items-center space-y-4"
              >
                <Avatar
                  w={300}
                  h={300}
                  src={
                    profilePic ? (typeof profilePic === 'string' ? profilePic : URL.createObjectURL(profilePic)) : null
                  }
                />
                <FormLabel>
                  <Button colorScheme="blackAlpha" variant="ghost" onClick={handleButtonClick}>
                    Change Image
                  </Button>
                  <Input
                    type="file"
                    accept="image/png, image/jpg, image/jpeg"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleChangeImage}
                  />
                </FormLabel>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }} w="100%" h="fit-content">
                <Field name="username">
                  {({ field, meta }) => (
                    <TextField
                      label="Username"
                      {...field}
                      type="text"
                      error={meta.touched && meta.error ? meta.error : null}
                    />
                  )}
                </Field>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }} w="100%" h="fit-content">
                <Field name="email">
                  {({ field, meta }) => (
                    <TextField
                      label="Email"
                      {...field}
                      type="email"
                      error={meta.touched && meta.error ? meta.error : null}
                    />
                  )}
                </Field>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }} w="100%" h="fit-content">
                <FormLabel>User Type</FormLabel>
                <RadioGroup
                  width="100%"
                  className="self-center"
                  name="role"
                  value={values.role}
                  onChange={(value) => setFieldValue('role', value)}
                >
                  <Stack mt={3} spacing={5} direction="row">
                    <Radio colorScheme="whatsapp" value="user">
                      I am a User
                    </Radio>
                    <Radio colorScheme="whatsapp" value="owner">
                      I am a Turf Owner
                    </Radio>
                  </Stack>
                </RadioGroup>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }} w="100%" h="fit-content">
                <ButtonGroup>
                  <Button type="submit" colorScheme="green">
                    Update
                  </Button>
                  <Button type="reset" colorScheme="Gray">
                    Reset
                  </Button>
                </ButtonGroup>
              </GridItem>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditProfile;
