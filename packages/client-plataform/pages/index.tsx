import { Button, Flex, Box, Heading, Image } from '@chakra-ui/core';
import React from 'react';
import { MdTrendingFlat } from 'react-icons/md';

import LandingLayout from '../components/layouts/landingLayout';

export default function Home() {
  return (
    <LandingLayout>
      <Flex
        as="main"
        w="100vw"
        height="85vh"
        align="center"
        justify="center"
        backgroundImage="url('/img/bg1.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Flex
          gridArea="message"
          borderRadius="md"
          flexDir="column"
          alignItems="stretch"
          padding={16}
        >
          <Heading
            size="sm"
            letterSpacing={1}
            textTransform="capitalize"
            fontWeight="700"
          >
            Code Dojo
          </Heading>
          <Heading
            mt={4}
            fontSize={['40px', '40px', '75px', '75px']}
            fontWeight="700"
            lineHeight={['3rem', '3rem', '6rem', '6rem']}
          >
            Aprendizado dos Ninjas
          </Heading>
          <Box>
            <Button
              w="200px"
              mt={8}
              size="md"
              bg="black"
              color="white"
              _hover={{ boxShadow: 'outline' }}
              _focus={{ boxShadow: 'outiline' }}
            >
              Comece já
              <Box
                position="absolute"
                right="5%"
                as={MdTrendingFlat}
                size="24px"
                color="white"
              />
            </Button>
          </Box>
        </Flex>
        <Flex
          gridArea="image"
          flexDir="column"
          alignItems="flex-start"
          display={['none', 'none', 'flex', 'flex']}
        >
          <Image src="/svg/hero-image.svg" height="660px" />
        </Flex>
      </Flex>
    </LandingLayout>
  );
}
