/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */
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
import React, { useEffect, useState } from 'react';
import { CgChevronLeft } from 'react-icons/cg';

import DashboardLayout from '../../../../components/layouts/dashboardLayout';
import ApiService from '../../../../services/api';
import {
  getModuleBySlug,
  getAllModules
} from '../../../../services/parseMarkdown/modulesMarkdown';

interface Topic {
  title: string;
  slug: string;
  description: string;
  image: string;
  order: number;
  content: string;
}

interface Module {
  title: string;
  slug: string;
  descriptionCard: string;
  description: string;
  image: string;
  topics: Array<Topic>;
}

interface WelcomeModuloProps {
  module: Module;
}

const WelcomeModulo: React.FC<WelcomeModuloProps> = props => {
  const { module } = props;

  const [lastTopic, setLastTopic] = useState(null);

  const getTopicRegistred = async () => {
    ApiService.get(`/modules/${module.slug}`)
      .then(({ data: responseData }) => {
        if (Object.entries(responseData.data).length > 0) {
          const { topics } = responseData.data;
          setLastTopic(topics[topics.length - 1].topic_slug);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTopicRegistred();
  }, []);

  const handleButtonInit = () => {
    if (lastTopic) {
      ApiService.post(`/modules/topics`, {
        module_slug: module.slug,
        topic_slug: lastTopic
      });
    } else {
      ApiService.post(`/modules/topics`, {
        module_slug: module.slug,
        topic_slug: module.topics[0].slug
      });
    }
  };

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
            <Link
              onClick={handleButtonInit}
              href={`/modulo/${module.slug}/dojo/${
                !lastTopic ? module.topics[0].slug : lastTopic
              }`}
            >
              <Button
                w="8.75rem"
                size="md"
                bg="black"
                color="white"
                _hover={{ boxShadow: 'outline' }}
                _focus={{ boxShadow: 'outiline' }}
              >
                {!lastTopic ? 'Iniciar' : 'Continuar'}
              </Button>
            </Link>
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
