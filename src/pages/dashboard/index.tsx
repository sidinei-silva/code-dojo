import { Box, Heading, Grid, Flex } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import DashboardLayout from '../../components/layouts/dashboardLayout';
import CardModule from '../../components/sections/cardModule';
import LastModule from '../../components/sections/lastModule';
import useAuth from '../../contexts/auth';
import ApiService from '../../services/api';
import { getAllModules } from '../../services/parseMarkdown/modulesMarkdown';

interface Module {
  title: string;
  slug: string;
  descriptionCard: string;
  description: string;
  image: string;
}

interface HomeProps {
  modules: Array<Module>;
}

const Dashboard: React.FC<HomeProps> = props => {
  const { modules } = props;
  const { user } = useAuth();
  const [lastModule, setLastModule] = useState<Module>(null);
  const [lastTopic, setLastTopic] = useState('');

  const getLastModule = async () => {
    ApiService.get('/modules').then(({ data: responseData }) => {
      if (Object.entries(responseData.data).length > 0) {
        const findLastModule = modules.find(
          module => module.slug === responseData.data[0].module_slug
        );
        const { topics } = responseData.data[0];
        setLastTopic(topics[topics.length - 1].topic_slug);
        setLastModule(findLastModule);
      }
    });
  };

  useEffect(() => {
    getLastModule();
  }, []);

  return (
    <DashboardLayout>
      <Grid gap="3.75rem" marginTop="3.75rem" justifyItems="center">
        <Box>
          <Heading
            fontSize={{ base: '2xl', lg: '28px', xl: '2.6rem' }}
            fontWeight="300"
            textAlign="center"
          >
            Bem Vindo(a){' '}
            <Heading
              as="span"
              fontSize={{ base: '2xl', lg: '28px', xl: '2.6rem' }}
              fontWeight="900"
            >
              {user?.name || ''}
            </Heading>
            !
          </Heading>
        </Box>
        {lastModule && (
          <>
            <Box textAlign="center">
              <Heading
                fontSize={{ base: 'lg', lg: 'xl', xl: '1.5rem' }}
                fontWeight="700"
              >
                Ultimo modulo acessado
              </Heading>
              <Heading
                marginTop="1em"
                fontWeight="300"
                color="gray.500"
                fontSize={{ base: 'lg', lg: 'xl', xl: '1.1rem' }}
              >
                Continue aqui o ultimo modulo visitado
              </Heading>
            </Box>
            <Flex justify="center">
              <LastModule
                image={lastModule.image}
                title={lastModule.title}
                description={lastModule.description}
                link={`/modulo/${lastModule.slug}/dojo/${lastTopic}`}
              />
            </Flex>
          </>
        )}

        <Box textAlign="center" marginTop={{ lg: '1.8rem' }}>
          <Heading
            fontSize={{ base: 'lg', lg: 'xl', xl: '1.5rem' }}
            fontWeight="700"
          >
            Módulos
          </Heading>
          <Heading
            marginTop="1em"
            fontWeight="300"
            color="gray.500"
            fontSize={{ base: 'lg', lg: 'xl', xl: '1.1rem' }}
          >
            Veja todos os nossos módulos disponíveis
          </Heading>
        </Box>
        <Grid
          templateColumns={{ md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
          gap="1.8rem"
          justifyItems="center"
        >
          {modules.map(module => (
            <CardModule
              key={module.slug}
              image={module.image}
              title={module.title}
              description={module.descriptionCard}
              link={`modulo/${module.slug}/boas-vindas`}
            />
          ))}

          {modules.length < 3 &&
            [...Array(3 - modules.length)].map(() => (
              <CardModule key={Math.random()} />
            ))}
        </Grid>
        <Box />
      </Grid>
    </DashboardLayout>
  );
};

export async function getStaticProps() {
  const allModules = await getAllModules();

  return {
    props: {
      modules: allModules
    }
  };
}

export default Dashboard;
