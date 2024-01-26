import React from 'react';
import { Box, Button, Flex, Text, chakra, useCheckbox } from '@chakra-ui/react';

function CustomCheckBox(props) {
    const { getInputProps, getCheckboxProps, getLabelProps, htmlProps, state } = useCheckbox(props);
    return (
        <chakra.label
        cursor={'pointer'}
            {...htmlProps}
        >
            <input {...getInputProps()} hidden />
                    <div {...getCheckboxProps()}>
                        <Button size={'sm'}
                            variant={state.isChecked ?'solid':'outline'}
                            colorScheme={props.touched && props.error?'red':"green"} 
                            pointerEvents={'none'}
                            {...getLabelProps()}
                            >
                            {props.children}
                        </Button>
                    </div>
            {/* <Text color="gray.700" >Click me</Text> */}
        </chakra.label>
    );
}

export default CustomCheckBox;
