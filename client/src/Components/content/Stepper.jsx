import React from 'react';
import PropTypes from 'prop-types';
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper as StepperChakra,
  Box,
} from '@chakra-ui/react';

const ReusableStepper = ({ activeStep, steps,setActiveStep, stepComponents }) => {
  return (
    <Box>
      <StepperChakra index={activeStep} mb={6} size={'sm'} colorScheme="whatsapp">
        {steps.map((step, index) => (
          <Step key={index} 
          className='cursor-pointer'
          onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon boxSize={4} />}
                incomplete={<StepNumber fontSize="sm">{index + 1}</StepNumber>}
                active={<StepNumber fontSize="sm">{index + 1}</StepNumber>}
              />
            </StepIndicator>

            <Box flexShrink="0" ml={2}>
              <StepTitle fontSize="sm">{step.title}</StepTitle>
              <StepDescription fontSize="xs">{step.description}</StepDescription>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </StepperChakra>
      <Box mt={4}>{stepComponents[activeStep]}</Box>
    </Box>
  );
};

ReusableStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  stepComponents: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ReusableStepper;
