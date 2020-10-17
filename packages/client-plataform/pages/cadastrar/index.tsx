import { Button, Flex, Box, Heading, Image, Grid } from '@chakra-ui/core';
import React from 'react';

import LandingLayout from '../../components/layouts/landingLayout';
import FormSignUp from '../../components/ui/forms/signUp';

export default function SignUp() {
  return (
    <LandingLayout>
      <Grid
        as="main"
        w="100vw"
        height="100vh"
        alignItems="center"
        templateColumns={{ lg: 'repeat(2, 1fr)' }}
        backgroundImage="url('/img/bg2.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        paddingTop="110px"
        paddingX={{ xxl: '300px' }}
      >
        <Flex
          gridColumn={1}
          display={{ base: 'none', lg: 'flex' }}
          justifyContent="center"
        >
          <Image src="/svg/register-image.svg" w="100%" />
        </Flex>

        <Flex
          gridColumn={{ md: 1, lg: 2 }}
          borderRadius="md"
          flexDir="column"
          alignItems="center"
        >
          <Heading
            fontSize={{ base: '4xl', lg: '48px', xl: '62px' }}
            fontWeight="300"
          >
            Bem Vindo(a){' '}
            <Heading
              as="span"
              fontSize={{ base: '4xl', lg: '48px', xl: '62px' }}
              fontWeight="900"
              color="blue.500"
            >
              Ninja
            </Heading>
            !
          </Heading>
          <Heading
            fontSize={{ base: 'lg', lg: 'xl', xl: '28px' }}
            fontWeight="700"
          >
            Estamos felizes com sua chegada!
          </Heading>
          <FormSignUp mt={10} w={{ base: 'xs', lg: 'sm', xl: 'md' }} />
        </Flex>
      </Grid>
    </LandingLayout>
  );
}
