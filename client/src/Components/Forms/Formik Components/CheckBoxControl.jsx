import { Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, Stack } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react'
import CustomCheckBox from './CustomCheckBox';

function CheckBoxControl({ data,label, ...props }) {
    const [field, meta] = useField(props) //input field and its meta data
    return (
        <>
            <FormControl isInvalid={meta.error && meta.touched}>
            <FormLabel>{label}</FormLabel>
                <CheckboxGroup colorScheme='green' >
                    <Stack spacing={[1, 5]} maxW={'100%'} flexWrap={'wrap'} direction={['column', 'row']}>
                        {
                            data.map((item, index) => (
                                <Checkbox key={label+index} {...field}  
                                checked={field.value.includes(item)}
                                value={item}>{item}</Checkbox>
                            ))
                        }
                    </Stack>
                </CheckboxGroup>
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
        </>
    )
}

export default CheckBoxControl