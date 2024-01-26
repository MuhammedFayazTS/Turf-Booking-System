import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, ButtonGroup, Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { motion } from "framer-motion"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function FeaturesCard({...props}) {
    
    const navigate = useNavigate()
    const {feature} = props;
    const [isHovered, setIsHovered] = useState(false);

    const cardVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.2 },
    };

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleHoverExit = () => {
        setIsHovered(false);
    };

return (
    <motion.div 
        initial="rest"
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverExit}
    >
        <Card maxW='sm' className='h-96' shadow={'lg'}>
            <CardBody>
                <Stack alignItems={'center'} spacing='5'>
                    <motion.div
                    variants={cardVariants}
                    className={`w-200 h-200 mb-2 rounded-md  ${isHovered?'bg-green-200':'bg-gray-100'}` }
                    >
                        <Image
                            w={100}
                            h={100}
                            p={3}
                            src={feature.img}
                            alt={feature.title}
                            borderRadius='lg'
                        />
                    </motion.div>
                    <Heading size='md' textAlign={'center'} >{feature.title}</Heading>
                    <Text>
                        {feature.description}
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter>
                <Button
                onClick={()=>navigate(feature.to)}
                 className='w-full' 
                rightIcon={<ArrowForwardIcon />}
                variant={isHovered?'solid':'outline'} 
                colorScheme='green'
                >
                    {feature.button}
                </Button>
            </CardFooter>
        </Card>
    </motion.div>
)
}

export default FeaturesCard