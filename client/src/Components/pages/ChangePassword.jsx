import React, { useState } from 'react';
import { Button, Divider, Grid, GridItem, Heading, Stack, useToast } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '../Forms/Formik Components/TextField';
import { changeUserPassword } from '../../redux/slices/auth.slice';

const validationSchema = Yup.object({
  oldPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().min(8, 'Password must be at least 8 characters long').required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

function ChangePassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  // State for showing/hiding passwords
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleSubmit = async (values) => {
    await dispatch(changeUserPassword(values));
  };

  return (
    <div className="p-4 md:p-8">
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className="flex flex-col space-y-4">
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
              <GridItem colSpan={{ base: 1, md: 3 }} w="100%" h="fit-content" mt={3}>
                <Heading as="h3" size="md" className="text-center md:text-left text-gray-600">
                  Change Your Password
                </Heading>
                <Divider mt={2} />
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }} w="100%" h="fit-content">
                <Field name="oldPassword">
                  {({ field, meta }) => (
                    <TextField
                      label="Current Password"
                      {...field}
                      placeholder="********"
                      type={showOldPass ? 'text' : 'password'}
                      setShow={setShowOldPass}
                      show={showOldPass}
                      showProtectedText={true}
                      error={meta.touched && meta.error ? meta.error : null}
                    />
                  )}
                </Field>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }} w="100%" h="fit-content">
                <Field name="newPassword">
                  {({ field, meta }) => (
                    <TextField
                      label="New Password"
                      {...field}
                      type={showNewPass ? 'text' : 'password'}
                      placeholder="********"
                      setShow={setShowNewPass}
                      show={showNewPass}
                      showProtectedText={true}
                      error={meta.touched && meta.error ? meta.error : null}
                    />
                  )}
                </Field>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }} w="100%" h="fit-content">
                <Field name="confirmPassword">
                  {({ field, meta }) => (
                    <TextField
                      label="Confirm New Password"
                      {...field}
                      type={showConfirmPass ? 'text' : 'password'}
                      placeholder="********"
                      setShow={setShowConfirmPass}
                      show={showConfirmPass}
                      showProtectedText={true}
                      error={meta.touched && meta.error ? meta.error : null}
                    />
                  )}
                </Field>
              </GridItem>

              <GridItem colSpan={{ base: 1, md: 2 }} w="100%" h="fit-content">
                <Stack direction="row" spacing={4}>
                  <Button type="submit" colorScheme="green" isLoading={loading}>
                    Update Password
                  </Button>
                  <Button type="reset">Reset</Button>
                </Stack>
              </GridItem>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangePassword;
