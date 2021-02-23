import { Box, Heading, Grid, Text } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import DojoLayout from '../../../../../../../components/layouts/dojoLayout';
import DojoHtml from '../../../../../../../components/sections/dojosTasks/dojoHtml';
import DojoJavascript from '../../../../../../../components/sections/dojosTasks/dojoJavascript';
import {
  getAllModules,
  getModuleBySlug
} from '../../../../../../../services/parseMarkdown/modulesMarkdown';
import { getTaskBySlug } from '../../../../../../../services/parseMarkdown/tasksMarkdown';
import {
  getTopicBySlug,
  getAllTopicsByModule
} from '../../../../../../../services/parseMarkdown/topicsMarkdown';

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
  task: Task;
}

const DojoTask: React.FC<PageProps> = props => {
  const { task, topic, module, listTopics } = props;

  const [nextTopicSlug, setNextTopicSlug] = useState('');

  useEffect(() => {
    const findIndex = listTopics.findIndex(
      topicFind => topicFind.slug === topic.slug
    );
    if (listTopics[findIndex + 1]) {
      setNextTopicSlug(listTopics[findIndex + 1].slug);
    } else {
      setNextTopicSlug(listTopics[findIndex].slug);
    }
  }, []);

  return (
    <DojoLayout
      moduleTitle={module.title}
      moduleSlug={module.slug}
      listTopics={listTopics}
      topic={topic}
    >
      <Grid
        height="100%"
        maxWidth="75rem"
        templateRows="1fr"
        minWidth={{ xl: '75rem' }}
      >
        <Box textAlign="justify" paddingX="3.75rem">
          <Heading
            fontSize={{ base: '2xl', lg: '28px' }}
            fontWeight="700"
            marginBottom="0.5rem"
            textAlign="center"
          >
            {task.title}
          </Heading>

          <Text marginBottom="1.875rem">
            <div dangerouslySetInnerHTML={{ __html: task.description }} />
          </Text>
        </Box>
        <Box>
          {!task.language && <div>Em breve</div>}
          {task.language === 'html' && <DojoHtml seed={task.content} />}
          {task.language === 'javascript' && (
            <DojoJavascript
              ruleTask={task.ruleTask}
              moduleSlug={module.slug}
              topicSlug={topic.slug}
              taskOrder={task.order}
              seed={task.content}
              nextTopicSlug={nextTopicSlug}
            />
          )}
        </Box>
        <Box />
      </Grid>
    </DojoLayout>
  );
};

export default DojoTask;

export async function getStaticProps(context: any) {
  return {
    props: {
      listTopics: await getAllTopicsByModule(context.params.slugModule),
      topic: await getTopicBySlug(
        context.params.slugModule,
        context.params.slugTopic
      ),
      module: await getModuleBySlug(context.params.slugModule),
      task: await getTaskBySlug(
        context.params.slugTopic,
        context.params.orderTask
      )
    }
  };
}

export async function getStaticPaths() {
  const modules = await getAllModules();

  const paths = await Promise.all(
    modules.map(async module => {
      const topics = await getAllTopicsByModule(module.slug);

      const pathsTopics = topics.map(topic => {
        const pathsTaks = topic.tasks.map(task => {
          return {
            params: {
              orderTask: task.order.toString(),
              slugTopic: topic.slug,
              slugModule: module.slug
            }
          };
        });
        return pathsTaks;
      });

      return pathsTopics;
    })
  );

  return {
    paths: paths.flat(Infinity),
    fallback: false
  };
}
