import {
  Box,
  Flex,
  Text,
  Image,
  Grid,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
  MenuDivider,
  Icon,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
  Button
} from '@chakra-ui/core';
import Link from 'next/link';
import React from 'react';
import { CgMenuLeftAlt, CgChevronDown } from 'react-icons/cg';
import { ImExit } from 'react-icons/im';

import useAuth from '../../../../contexts/auth';

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

const HeaderLoggedIn = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { logout, user } = useAuth();
  return (
    <Grid
      position="absolute"
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
      <Flex w="100%" order={-1} justify="flex-start">
        <Image w={{ xs: '45px', md: '70px' }} src="/img/logo_transparent.png" />
      </Flex>

      <Flex
        gridColumn={0}
        justify="flex-start"
        justifySelf="center"
        align="center"
        display={{ base: 'none', md: 'flex' }}
      >
        <MenuItems to="/dashboard">Home</MenuItems>
        <MenuItems to="/news">Novidades</MenuItems>
      </Flex>

      <Flex
        display={{ base: 'none', md: 'flex' }}
        align="center"
        justifySelf="flex-end"
        maxWidth="200px"
      >
        <Avatar
          name={user.name}
          src="https://bit.ly/tioluwani-kolawole"
          size="sm"
          fontWeight="700"
          mr={2}
        />
        <Menu>
          <MenuButton as={Text}>
            {user.name} <Icon as={CgChevronDown} size="1em" color="black" />
          </MenuButton>
          <MenuList>
            <MenuGroup title="Perfil">
              <MenuItem>Minha conta</MenuItem>
              <MenuItem>Minhas estatisticas </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Ajuda">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuItem onClick={() => logout()}>Sair</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>

        <Box marginLeft="1rem" display={{ base: 'none', md: 'flex' }}>
          <Button size="xs" variantColor="red" onClick={() => logout()}>
            Sair
          </Button>
        </Box>
      </Flex>

      <Box
        gridColumn={3}
        justifySelf="flex-end"
        display={{ base: 'block', md: 'none' }}
      >
        <Box
          as={CgMenuLeftAlt}
          ref={btnRef}
          onClick={onOpen}
          size="1.7em"
          color="black"
        />
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Flex
            boxShadow="md"
            justify="flex-start"
            paddingY={3}
            paddingX={5}
            align="center"
          >
            <Image w="50px" src="/img/logo_transparent.png" />
          </Flex>

          <DrawerBody marginTop={5}>
            <Flex justify="flex-start" align="center" direction="column">
              <Flex direction="column" align="center" justify="center">
                <Avatar
                  name="David Sylvies"
                  size="lg"
                  backgroundColor="blue.900"
                  color="white"
                />
                <Text marginTop={5} fontWeight="700">
                  David Sylvies
                </Text>
                <Text>davidsylvies@email.com</Text>
              </Flex>

              <Divider width="100%" marginY={5} />
              <MenuItems to="/">Home</MenuItems>
              <MenuItems to="/how">Módulos</MenuItems>
              <MenuItems to="/news">Novidades</MenuItems>
              <Divider width="100%" marginY={5} />
              <MenuItems to="/">Minha Conta</MenuItems>
              <MenuItems to="/how">Minhas Estatisticas</MenuItems>
              <Divider width="100%" marginY={5} />
              <Box marginTop={2} as={ImExit} size="1.5em" color="blue.900" />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Text as="h1">Code Dojo</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Grid>
  );
};

export default HeaderLoggedIn;
