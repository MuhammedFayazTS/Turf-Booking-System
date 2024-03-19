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
    IconButton,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'


function TextField({ label, ...props }) {

    const [field, meta] = useField(props) //input field and its meta data
    // const [show, setShow] = React.useState(false)
    const handleClick = () => props.setShow(!props.show)
    return (
        <div>
            <FormControl isInvalid={meta.error && meta.touched}>
                {!props.noLabel && <FormLabel>{label}</FormLabel>}
                <InputGroup size='lg'>
                    <Input variant='filled' size='lg' {...field} {...props}
                        value={field.value || ''} onChange={field.onChange} placeholder={label} />
                    <InputRightElement width='4.5rem'>
                        {
                            (field.name === 'password' || field.name === 'confirmPassword') && (
                                <IconButton size='sm' isRound onClick={handleClick}>
                                    {props.show ? <EyeIcon class="h-6 w-6" /> : <EyeSlashIcon class="h-6 w-6" />}
                                </IconButton>
                            )
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