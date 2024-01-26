import React, { useState } from 'react';
import { Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Grid, Stack, Tooltip } from '@chakra-ui/react';
import moment from 'moment';
import { QuestionOutlineIcon } from '@chakra-ui/icons';
import CustomCheckBox from '../Forms/Formik Components/CustomCheckBox';

const TimeMenuForForm = () => {
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false)
    const totalHours = 24;

    const handleTimeSelect = (hour) => {
        const isHourSelected = selectedTimes.includes(hour);
        let updatedTimes = [];

        if (isHourSelected) {
            updatedTimes = selectedTimes.filter((time) => time !== hour);
        } else {
            updatedTimes = [...selectedTimes, hour];
        }

        setSelectedTimes(updatedTimes);
    };

    const handleSelectAll = () => {
        const allHours = Array.from({ length: totalHours }, (_, index) => index);
        setSelectedTimes(allHours);
    };

    const handleToggleAll = () => {
        if (isAllSelected) {
            setIsAllSelected(!isAllSelected)
            setSelectedTimes([]);
        } else {
            setIsAllSelected(!isAllSelected)
            handleSelectAll();
        }
    };

    const formatHour = (hour) => {
        return moment().hour(hour).minute(0).format('hh:mm A');
    };

    return (
        <>
            <Flex justify="center">
                <FormControl>
                    <FormLabel>
                        <span className='me-2'>Timing</span>
                        <Tooltip hasArrow placement='right' fontSize='md'
                            label='Select your working hours from below'  >
                            <QuestionOutlineIcon />
                        </Tooltip>
                        {/* <FormHelperText color={'red'} >*select at least one</FormHelperText> */}
                    </FormLabel>

                    <Grid w={'100%'} templateColumns='repeat(12, 1fr)' gap={4}>
                        {/* for selecting and deselecting all */}
                        <Button
                            onClick={handleToggleAll}
                            size={'sm'}
                            variant={'outline'}
                            colorScheme="green"
                        >
                            {isAllSelected ? 'Deselect All' : 'Select All'}
                        </Button>
                        {[...Array(totalHours)].map((_, index) => {
                            const hour = index;
                            const formattedHour = formatHour(hour);

                            return (
                                <CustomCheckBox
                                    key={formattedHour}
                                    size={'sm'}
                                    variant={selectedTimes.includes(hour) ? 'solid' : 'outline'}
                                    colorScheme="green"
                                    value = {formattedHour}
                                    onClick={() => handleTimeSelect(hour)}
                                 />
                            );
                        })}
                    </Grid>
                </FormControl>
            </Flex>
        </>
    );
};

export default TimeMenuForForm;
