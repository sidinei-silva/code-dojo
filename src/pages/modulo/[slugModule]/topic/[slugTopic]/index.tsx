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

import DashboardLayout from '../../../../../components/layouts/dashboardLayout';
import MarkdownSlice from '../../../../../components/sections/markdownSlice';
import { getAllModules } from '../../../../api/modulesMarkdown';
import {
  getTopicBySlug,
  getAllTopicsByModule
} from '../../../../api/topicsMarkdown';

interface Topic {
  title: string;
  slug: string;
  description: string;
  image: string;
  order: number;
  content: string;
}

interface PageProps {
  topic: Topic;
  moduleSlug: string;
}

const Topic: React.FC<PageProps> = props => {
  const { topic, moduleSlug } = props;

  return (
    <DashboardLayout>
      <Grid
        gap="3.75rem"
        marginTop="3.75rem"
        justifyItems="center"
        maxWidth="75rem"
        minWidth={{ xl: '75rem' }}
      >
        <Box justifySelf="flex-start">
          <Link href={`/modulo/${moduleSlug}`}>
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
            {topic.title}
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
            maxWidth="8rem"
            src={topic.image}
          />
        </Flex>

        <Grid maxWidth="43.75rem" textAlign="justify">
          <MarkdownSlice content={topic.content} />
        </Grid>
        <Box />
      </Grid>
    </DashboardLayout>
  );
};

export default Topic;

export async function getStaticProps(context: any) {
  return {
    props: {
      topic: await getTopicBySlug(
        context.params.slugModule,
        context.params.slugTopic
      ),
      moduleSlug: context.params.slugModule
    }
  };
}

export async function getStaticPaths() {
  const modules = await getAllModules();

  const paths = await Promise.all(
    modules.map(async module => {
      const topics = await getAllTopicsByModule(module.slug);

      const pathsTopics = topics.map(topic => {
        return { params: { slugTopic: topic.slug, slugModule: module.slug } };
      });

      return pathsTopics;
    })
  );

  return {
    paths: paths.flat(Infinity),
    fallback: false
  };
}
