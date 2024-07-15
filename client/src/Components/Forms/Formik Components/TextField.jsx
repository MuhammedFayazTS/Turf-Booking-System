import { useField } from 'formik';
import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function TextField({ label, noLabel, show, setShow, showProtectedText, placeholder, fontSize = 'medium', ...props }) {
  const [field, meta] = useField(props);

  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      {!noLabel && <FormLabel htmlFor={props.name}>{label}</FormLabel>}
      <InputGroup size="lg">
        <Input
          variant="filled"
          size="lg"
          fontSize={fontSize}
          autoComplete="off"
          {...field}
          {...props}
          value={field.value || ''}
          onChange={field.onChange}
          placeholder={placeholder}
          type={showProtectedText && !show ? 'password' : 'text'}
        />
        {showProtectedText && (
          <InputRightElement width="4.5rem">
            <IconButton size="sm" isRound onClick={handleClick}>
              {show ? <EyeIcon className="h-6 w-6" /> : <EyeSlashIcon className="h-6 w-6" />}
            </IconButton>
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default TextField;
