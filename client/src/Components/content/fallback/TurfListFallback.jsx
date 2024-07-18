import { Box, Image, Stack } from '@chakra-ui/react';
import React from 'react';

const TurfListFallback = () => {
  return (
    <Stack justifyContent={'center'} alignItems={'center'} w={'full'} height={400}>
      <Image
        loading="lazy"
        src="https://illustrations.popsy.co/white/resistance-band.svg"
        alt="question-mark"
        className="h-[300px] w-auto"
      />
      <p className="mt-6 text-sm font-semibold text-black">404 error</p>
      <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">We can&apos;t find any turfs</h1>
    </Stack>
  );
};

export default TurfListFallback;
