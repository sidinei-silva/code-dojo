import { Box, Flex, Text, Button, Icon, Image } from '@chakra-ui/core';
import Link from 'next/link';
import React from 'react';

const MenuItems = props => {
  const { children, isLast, to = '/', ...rest } = props;
  return (
    <Text
      color="black"
      fontWeight="500"
      mb={{ base: isLast ? 0 : 4, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
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
    <Flex
      as="nav"
      align={['center', 'center', 'flex-end', 'flex-end']}
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      padding="1.5rem"
      bg={['primary.500', 'primary.500', 'primary.500', 'primary.500']}
      color={['white', 'black', 'black.700', 'black.700']}
      {...props}
    >
      <Box>
        <Image w="70px" src="/img/logo_transparent.png" />
      </Box>

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? (
          <Icon name="close" color="black" />
        ) : (
          <Icon name="close" color="black" />
        )}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'center', 'space-between', 'space-between']}
          direction={['column', 'column', 'row', 'row']}
          pt={[4, 4, 0, 0]}
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
      </Box>

      <Box display={{ base: 'none', md: 'block' }}>
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
      </Box>
    </Flex>
  );
};

export default Header;
