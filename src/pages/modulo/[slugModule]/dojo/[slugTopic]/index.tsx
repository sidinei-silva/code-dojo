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

import DojoLayout from '../../../../../components/layouts/dojoLayout';
import MarkdownSlice from '../../../../../components/sections/markdownSlice';
import { getAllModules, getModuleBySlug } from '../../../../api/modules';
import { getTopicBySlug, getAllTopicsByModule } from '../../../../api/topics';

interface Task {
  title: string;
  topic: string;
  description: string;
  order: number;
  language: string;
  ruleTask: string;
  content: string;
}

interface Topic {
  title: string;
  slug: string;
  description: string;
  image: string;
  order: number;
  content: string;
  tasks: Array<Task>;
}

interface Module {
  title: string;
  slug: string;
  descriptionCard: string;
  description: string;
  image: string;
}

interface PageProps {
  listTopics: Array<Topic>;
  topic: Topic;
  module: Module;
}

const DojoTopic: React.FC<PageProps> = props => {
  const { topic, module, listTopics } = props;

  return (
    <DojoLayout
      moduleTitle={module.title}
      moduleSlug={module.slug}
      listTopics={listTopics}
      topic={topic}
    >
      <Grid
        gap="1.75rem"
        marginTop="1.75rem"
        justifyItems="center"
        maxWidth="75rem"
        minWidth={{ xl: '75rem' }}
      >
        <Box maxWidth="43.75rem" textAlign="justify">
          <Heading
            fontSize={{ base: '2xl', lg: '28px', xl: '2.6rem' }}
            fontWeight="700"
            textAlign="center"
            marginBottom="1.75rem"
          >
            {topic.title}
          </Heading>
          <MarkdownSlice content={topic.content} />
        </Box>
        <Box />
      </Grid>
    </DojoLayout>
  );
};

export default DojoTopic;

export async function getStaticProps(context: any) {
  return {
    props: {
      listTopics: await getAllTopicsByModule(context.params.slugModule),
      topic: await getTopicBySlug(
        context.params.slugModule,
        context.params.slugTopic
      ),
      module: await getModuleBySlug(context.params.slugModule)
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
