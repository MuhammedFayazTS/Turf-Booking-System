import { useField } from 'formik'
import React from 'react'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Input,
    InputGroup,
    Button,
    InputRightElement,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'


function TextField({ label, ...props }) {

    const [field, meta] = useField(props) //input field and its meta data
    // const [show, setShow] = React.useState(false)
    const handleClick = () => props.setShow(!props.show)
    console.log("first",field)
    return (
        <div>
            <FormControl isInvalid={meta.error && meta.touched}>
                <FormLabel>{label}</FormLabel>
                <InputGroup size='lg'>
                    <Input variant='filled' size='lg' {...field} {...props}
                    value={field.value || ''} onChange={field.onChange} placeholder={label} />
                    <InputRightElement width='4.5rem'>
                        {
                            field.name === 'password' && <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {props.show ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        }
                    </InputRightElement>
                    {
                        props.name === 'otp' &&
                        <InputRightElement width='4.5rem'>
                            <Button variant='ghost' size='sm' >send</Button>
                        </InputRightElement>
                    }
                </InputGroup>
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
        </div>
    )
}

export default TextField