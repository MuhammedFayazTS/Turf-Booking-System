import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Avatar,
  Stack,
  Box,
  useDisclosure,
  Image,
  AspectRatio,
  Center,
} from '@chakra-ui/react';
import FileUpload from '../../core/FileUpload/FileUpload';

const validationSchema = Yup.object({
  image: Yup.mixed()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value) return true; // If no image, skip size validation
      return value.size <= 10485760; // 10 MB
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value) return true; // If no image, skip type validation
      return ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(value.type);
    })
    .required('Image is required'),
});

const FileUploaderModal = ({
  title,
  buttonText = 'Open',
  maxSize = 10485760,
  isRound = false,
  onUpload,
  ...otherProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (values) => {
    if (onUpload) {
      onUpload(values);
    }
    onClose();
  };

  return (
    <>
      <Button {...otherProps} onClick={onOpen}>
        {buttonText}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <Formik initialValues={{ image: null }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, setFieldValue }) => (
            <Form>
              <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Stack spacing={4}>
                    {values.image &&
                      (isRound ? (
                        <Center>
                          <Avatar size="2xl" src={URL.createObjectURL(values.image)} alt="Selected Image" />
                        </Center>
                      ) : (
                        <AspectRatio maxW="150px" ratio={1 / 1}>
                          <Image
                            maxH={150}
                            aspectRatio={''}
                            src={URL.createObjectURL(values.image)}
                            alt="Selected Image"
                            objectFit={'cover'}
                          />
                        </AspectRatio>
                      ))}
                    <FileUpload
                      name="image"
                      placeholder={title}
                      acceptedFileTypes="image/*"
                      isDropZone
                      isRequired
                      maxSize={maxSize}
                      setFieldValue={setFieldValue}
                      value={values.image}
                    >
                      Upload File
                    </FileUpload>
                  </Stack>
                </ModalBody>
                <ModalFooter justifyContent={'center'}>
                  <Button colorScheme="whatsapp" mr={3} type="submit">
                    Submit
                  </Button>
                  <Button type="reset">Reset</Button>
                </ModalFooter>
              </ModalContent>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default FileUploaderModal;
