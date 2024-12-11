import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Icon } from '@chakra-ui/react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import { useField } from 'formik';

const FileUpload = ({
  name,
  placeholder,
  acceptedFileTypes,
  children,
  isDropZone = false,
  isRequired = false,
  maxSize = 10485760, // 10 MB default
}) => {
  const inputRef = useRef();
  const [field, meta, helpers] = useField({ name, required: isRequired });
  const [error, setError] = useState();

  const handleFileChange = (file) => {
    if (file.size > maxSize) {
      const errorMessage = `File size exceeds the maximum limit of ${maxSize / (1024 * 1024)} MB`;
      helpers.setError(errorMessage);
      setError(errorMessage);
      helpers.setValue(undefined); // Clear the value
      return; // Exit early
    }
    helpers.setValue(file); // Set the valid file
    helpers.setError(null); // Clear any existing error
    setError(null); // Clear local error
  };

  const handleDrop = (files) => {
    const file = files[0];
    if (file) {
      helpers.setTouched(true); // Mark the field as touched
      handleFileChange(file);
    }
  };

  return (
    <FormControl isInvalid={meta.touched && Boolean(meta.error)} isRequired={isRequired}>
      <FormLabel htmlFor={name}>{children}</FormLabel>
      {isDropZone ? (
        <>
          <DropZone
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            acceptedFileTypes={acceptedFileTypes}
            isInvalid={Boolean(meta.error) || Boolean(error)}
          />
          <input
            type="file"
            accept={acceptedFileTypes}
            name={name}
            ref={inputRef}
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              if (file) {
                helpers.setTouched(true); // Mark the field as touched
                handleFileChange(file);
              }
            }}
            style={{ display: 'none' }}
          />
        </>
      ) : (
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<Icon as={PhotoIcon} />} />
          <input
            type="file"
            accept={acceptedFileTypes}
            name={name}
            ref={inputRef}
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              if (file) {
                helpers.setTouched(true); // Mark the field as touched
                handleFileChange(file);
              }
            }}
            style={{ display: 'none' }}
          />
          <Input
            placeholder={placeholder || 'Your file ...'}
            onClick={() => inputRef.current?.click()}
            value={field.value?.name || ''}
            readOnly
          />
        </InputGroup>
      )}
      <p className="text-red-400">{error}</p>
      <FormErrorMessage>{meta.touched && meta.error ? meta.error : null}</FormErrorMessage>
    </FormControl>
  );
};

export default FileUpload;

const DropZone = ({ onDrop, onClick, acceptedFileTypes, isInvalid }) => {
  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      onDrop(files);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default to allow drop
  };

  return (
    <div
      onClick={onClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`flex items-center justify-center w-full ${isInvalid ? 'border-red-300' : 'border-gray-300'}`}
    >
      <label
        htmlFor="dropzone-file"
        className={`flex flex-col items-center justify-center w-full h-56 border-2 border-dashed ${isInvalid && 'border-red-300'} rounded-lg cursor-pointer bg-gray-50 ${isInvalid && 'bg-red-50'} hover:bg-gray-100`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            {acceptedFileTypes === 'image/*' ? 'SVG, PNG, JPG or GIF' : acceptedFileTypes}
          </p>
        </div>
      </label>
    </div>
  );
};
