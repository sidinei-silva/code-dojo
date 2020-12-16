import {
  Box,
  Heading,
  Grid,
  Flex,
  Text,
  Link,
  Icon,
  Button
} from '@chakra-ui/core';
import React from 'react';
import { CgChevronLeft } from 'react-icons/cg';

import DashboardLayout from '../../../../components/layouts/dashboardLayout';
import { getModuleBySlug, getAllModules } from '../../../api/modulesMarkdown';

interface Module {
  title: string;
  slug: string;
  descriptionCard: string;
  description: string;
  image: string;
}

interface WelcomeModuloProps {
  module: Module;
}

const WelcomeModulo: React.FC<WelcomeModuloProps> = props => {
  const { module } = props;

  return (
    <DashboardLayout>
      <Grid
        gap="1rem"
        marginTop={{ md: '3.75rem' }}
        justifyItems="center"
        maxWidth="75rem"
      >
        <Box justifySelf="flex-start">
          <Link href="/dashboard">
            <Text fontSize="1.2rem" fontWeight="700">
              <Icon as={CgChevronLeft} size="1em" color="black" />
              Voltar
            </Text>
          </Link>
        </Box>
        <Flex
          paddingY={{ xs: '1rem' }}
          paddingX={{ base: '1rem', lg: '15rem' }}
          backgroundColor="rgba(206, 217, 235, 0.5)"
          minWidth={{ lg: '70rem', xl: '75rem' }}
          minHeight={{ lg: '38rem', xl: '43.75rem' }}
          direction="column"
          justify="center"
          align={{ xs: 'center', lg: 'flex-start' }}
        >
          <Box marginBottom="5.6rem">
            <Heading
              fontSize={{ base: '2xl', lg: '28px', xl: '2.6rem' }}
              fontWeight="900"
              textAlign="left"
            >
              Bem Vindo(a)!
            </Heading>
          </Box>
          <Box marginBottom="3.75rem">
            <Heading
              fontSize={{ base: '2xl', lg: '28px', xl: '2.6rem' }}
              fontWeight={{ md: '300' }}
              textAlign="left"
            >
              {module.title}
            </Heading>
          </Box>
          <Box marginBottom="3.75rem">
            <Text fontSize="1.2rem" lineHeight="1.75rem">
              {module.description}
            </Text>
          </Box>
          <Grid justifyContent="center" gap="1rem" alignSelf="center">
            <Button
              w="8.75rem"
              size="md"
              bg="black"
              color="white"
              _hover={{ boxShadow: 'outline' }}
              _focus={{ boxShadow: 'outiline' }}
            >
              <Link href="/">Iniciar</Link>
            </Button>
            <Button
              w="8.75rem"
              size="md"
              bg="blue.500"
              color="white"
              _hover={{ boxShadow: 'outline' }}
              _focus={{ boxShadow: 'outiline' }}
            >
              <Link href={`/modulo/${module.slug}`}>Ver detalhes</Link>
            </Button>
          </Grid>
        </Flex>

        <Box />
      </Grid>
    </DashboardLayout>
  );
};

export default WelcomeModulo;

export async function getStaticProps(context: any) {
  return {
    props: { module: await getModuleBySlug(context.params.slugModule) }
  };
}

export async function getStaticPaths() {
  let paths = await getAllModules();

  paths = paths.map(module => {
    return {
      params: { slugModule: module.slug }
    };
  });

  return {
    paths,
    fallback: false
  };
}
