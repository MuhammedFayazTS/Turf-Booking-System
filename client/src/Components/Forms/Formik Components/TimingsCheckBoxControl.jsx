import { Button, Checkbox, CheckboxGroup, FormControl, FormErrorMessage, FormLabel, Stack, Tooltip } from '@chakra-ui/react'
import { useField, useFormikContext } from 'formik'
import React, { useRef, useState } from 'react'
import CustomCheckBox from './CustomCheckBox'
import { QuestionOutlineIcon } from '@chakra-ui/icons'

function TimingsCheckBoxControl({ data, label, ...props }) {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props) //input field and its meta data
    const [selectAll, setSelectAll] = useState(false);

    
    const handleToggleAll = () => {
        if(!selectAll){
            setSelectAll(!selectAll);
            field.value.length = 0
            setFieldValue(props.name, data); // Update field value using setFieldValue
        } else {
            setSelectAll(false);
            setFieldValue(props.name, []); 
        }

    };


    return (
        <>
            <FormControl isInvalid={meta.touched && meta.error}>
                <FormLabel>
                    <span className='me-2'>{label}</span>
                    <Tooltip hasArrow placement='right' fontSize='md'
                        label='Select your working hours from below'  >
                        <QuestionOutlineIcon />
                    </Tooltip>
                </FormLabel>
                <CheckboxGroup colorScheme='green' >
                    <Stack spacing={{base:3,md:[1, 5]}} maxW={'100%'} flexWrap={'wrap'} direction={'row'}>
                    <Button
                            onClick={handleToggleAll}
                            size={'sm'}
                            variant={'outline'}
                            colorScheme="green"
                        >
                            {selectAll? 'Deselect All' : 'Select All'}
                        </Button>
                        {
                            data.map((item, index) => (
                                <CustomCheckBox   key={label + index} 
                                    {...field}
                                    touched={meta.touched}
                                    error={meta.error}
                                    checked={field.value.includes(item)}
                                    isChecked={field.value.includes(item)}
                                    value={item}>{item}</CustomCheckBox>
                            ))
                        }
                    </Stack>
                </CheckboxGroup>
                <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
        </>
    )
}

export default TimingsCheckBoxControl