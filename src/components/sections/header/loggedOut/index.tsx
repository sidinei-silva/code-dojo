import { Box, Flex, Text, Button, Image, Grid } from '@chakra-ui/core';
import Link from 'next/link';
import React from 'react';
import { CgMenuLeftAlt, CgClose } from 'react-icons/cg';

const MenuItems = props => {
  const { children, isLast, to = '/', ...rest } = props;
  return (
    <Text
      color="black"
      fontWeight="500"
      mb={{ base: 4, md: 0 }}
      px={4}
      display="block"
      {...rest}
    >
      <Link href={to}>{children}</Link>
    </Text>
  );
};

const Header = props => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Grid
      position={{ base: show ? 'relative' : 'absolute', md: 'absolute' }}
      alignItems="center"
      templateColumns="repeat(3, 1fr)"
      as="nav"
      w="100%"
      paddingX={{ xxl: '330px' }}
      padding={{ xs: '1rem', md: '1.5rem' }}
      backgroundColor="rgba(255,255,255,0.5)"
      color={['white', 'black', 'black.700', 'black.700']}
      boxShadow="md"
      {...props}
    >
      <Flex
        gridColumn={3}
        justify="flex-end"
        display={{ base: 'flex', md: 'none' }}
        onClick={toggleMenu}
      >
        {show ? (
          <Box as={CgClose} size="1.7em" color="black" />
        ) : (
          <Box as={CgMenuLeftAlt} size="1.7em" color="black" />
        )}
      </Flex>

      <Flex
        gridColumn={[2, 2, 1, 1]}
        justify="flex-start"
        align="center"
        display={{ base: show ? 'flex' : 'none', md: 'flex' }}
        pt={[8, 8, 0, 0]}
        direction={['column', 'column', 'row', 'row']}
      >
        <MenuItems to="/">Home</MenuItems>
        <MenuItems to="/how">Sobre</MenuItems>
        <MenuItems to="/news">Novidades</MenuItems>
        <MenuItems>
          <Flex
            wrap="wrap"
            display={{ base: 'flex', md: 'none' }}
            direction="column"
          >
            <Button
              mt={2}
              size="sm"
              rounded="md"
              color="white"
              bg="blue.500"
              _hover={{
                color: 'white',
                borderColor: 'blue.300',
                boxShadow: 'outline'
              }}
            >
              Entrar
            </Button>
            <Button
              size="sm"
              mt={2}
              variant="outline"
              rounded="md"
              color="blue.500"
              _hover={{
                boxShadow: 'outline'
              }}
            >
              Cadastrar
            </Button>
          </Flex>
        </MenuItems>
      </Flex>

      <Flex
        w="100%"
        order={[-1, -1, 0, 0]}
        justify={['flex-start', 'flex-start', 'center', 'center']}
      >
        <Image w={{ xs: '45px', md: '70px' }} src="/img/logo_transparent.png" />
      </Flex>

      <Flex display={{ base: 'none', md: 'flex' }} justify="flex-end">
        <Button
          size="sm"
          variant="outline"
          rounded="md"
          color="blue.500"
          mr={2}
          _hover={{
            boxShadow: 'outline'
          }}
        >
          Cadastrar
        </Button>
        <Button
          size="sm"
          rounded="md"
          color="white"
          bg="blue.500"
          _hover={{
            color: 'white',
            borderColor: 'blue.300',
            boxShadow: 'outline'
          }}
        >
          Entrar
        </Button>
      </Flex>
    </Grid>
  );
};

export default Header;
