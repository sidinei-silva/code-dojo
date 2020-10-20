import { Box, Heading, Grid, Flex } from '@chakra-ui/core';
import React from 'react';

import DashboardLayout from '../../components/layouts/dashboardLayout';
import LastModule from '../../components/sections/lastModule';

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Grid gap="3.75rem" marginTop="3.75rem">
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
              David Sylvian
            </Heading>
            !
          </Heading>
        </Box>
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
            image="/svg/html5.svg"
            title="Conceitos e Estutrura do HTML"
            description="There’s a quick and easy way to help your kids become happier. is
          simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book."
            link="/"
          />
        </Flex>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
