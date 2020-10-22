import {
  Box,
  Heading,
  Grid,
  Flex,
  Image,
  Text,
  Link,
  Icon
} from '@chakra-ui/core';
import React from 'react';
import { CgChevronLeft } from 'react-icons/cg';

import DashboardLayout from '../../components/layouts/dashboardLayout';
import CardTopic from '../../components/sections/cardTopic';
import { getModuleBySlug, getAllModules } from '../api/modules';

interface Topic {
  title: string;
  slug: string;
  description: string;
  order: number;
}

interface Module {
  title: string;
  slug: string;
  descriptionCard: string;
  description: string;
  image: string;
  topics: Array<Topic>;
}

interface HomeProps {
  module: Module;
}

const Modulo: React.FC<HomeProps> = props => {
  const { module } = props;
  return (
    <DashboardLayout>
      <Grid
        gap="3.75rem"
        marginTop="3.75rem"
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
        <Box>
          <Heading
            fontSize={{ base: '2xl', lg: '28px', xl: '2.6rem' }}
            fontWeight="300"
            textAlign="center"
          >
            {module.title}
          </Heading>
        </Box>
        <Flex
          align="center"
          justify="center"
          borderRadius="6px"
          width="100%"
          height="100vh"
          maxWidth="43.75rem"
          maxHeight="20rem"
          padding="1.9rem"
          backgroundColor="rgba(206, 217, 235, 0.5)"
        >
          <Image
            borderRadius="18px"
            backgroundColor="blue.500"
            padding="30px"
            src={module.image}
            maxWidth="8rem"
          />
        </Flex>
        <Box maxWidth="43.75rem" textAlign="justify">
          <Text fontSize="1.2rem" lineHeight="1.75rem">
            {module.description}
          </Text>
        </Box>

        <Box textAlign="center" marginTop={{ lg: '1.8rem' }}>
          <Heading
            fontSize={{ base: 'lg', lg: 'xl', xl: '1.5rem' }}
            fontWeight="700"
          >
            Tópicos
          </Heading>
          <Heading
            marginTop="1em"
            fontWeight="300"
            color="gray.500"
            fontSize={{ base: 'lg', lg: 'xl', xl: '1.1rem' }}
          >
            Veja os tópicos presente neste modulo
          </Heading>
        </Box>
        <Grid
          templateColumns={{ md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
          gap="1.8rem"
          justifyItems="center"
        >
          {module.topics.map(topic => (
            <CardTopic
              key={topic.slug}
              title={topic.title}
              description={topic.description}
              link={`modulo/${topic.slug}`}
            />
          ))}
        </Grid>
        <Box />
      </Grid>
    </DashboardLayout>
  );
};

export default Modulo;

export async function getStaticProps(context: any) {
  return {
    props: { module: await getModuleBySlug(context.params.slug) }
  };
}

export async function getStaticPaths() {
  let paths = await getAllModules();

  paths = paths.map(module => {
    return {
      params: { slug: module.slug }
    };
  });

  return {
    paths,
    fallback: false
  };
}
