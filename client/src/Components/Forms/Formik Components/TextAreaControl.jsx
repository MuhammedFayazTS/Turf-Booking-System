import { FormControl, FormErrorMessage, FormLabel, InputGroup, Textarea } from '@chakra-ui/react'
import { useField } from 'formik'
import React from 'react'

function TextAreaControl({ label, ...props }) {

    const [field, meta] = useField(props)
    return (
        <>
            <FormControl isInvalid={meta.error && meta.touched}>
                <FormLabel>{label}</FormLabel>
                <Textarea variant='filled' size='lg' {...field} {...props} />
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
        </>
    )
}

export default TextAreaControl