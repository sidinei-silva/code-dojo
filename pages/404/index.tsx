import { Grid, Heading, Flex, Image, Button } from '@chakra-ui/core';
import React from 'react';

const Page404: React.FC = () => {
  return (
    <Grid
      as="main"
      w="100vw"
      height="100vh"
      alignItems="center"
      templateRows={{ lg: 'repeat(2, 1fr)' }}
      backgroundImage="url('/img/bg4.png')"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      paddingTop="110px"
      paddingX={{ xxl: '300px' }}
    >
      <Flex gridColumn={1} justifyContent="center">
        <Image src="/svg/404-image.svg" maxHeight="240px" maxWidth="80%" />
      </Flex>
      <Flex
        alignSelf="flex-start"
        direction="column"
        align="center"
        justifyContent="flex-start"
        textAlign="center"
      >
        <Heading
          fontSize={{ base: '4xl', lg: '48px', xl: '62px' }}
          fontWeight="700"
        >
          Página não encontrada.
        </Heading>
        <Heading
          fontSize={{ base: 'lg', lg: 'xl', xl: '34px' }}
          fontWeight="500"
        >
          Algo legal está chegando. Fique ligado(a)!
        </Heading>
        <Button
          w="200px"
          mt={10}
          size="md"
          bg="black"
          color="white"
          type="submit"
          _hover={{ boxShadow: 'outline' }}
          _focus={{ boxShadow: 'outiline' }}
        >
          Página Inicial
        </Button>
      </Flex>
    </Grid>
  );
};

export default Page404;
