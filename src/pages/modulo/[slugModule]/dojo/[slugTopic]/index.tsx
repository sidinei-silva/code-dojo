import {
  Box,
  Heading,
  Grid,
  Text,
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Link
} from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';

import DojoLayout from '../../../../../components/layouts/dojoLayout';
import MarkdownSlice from '../../../../../components/sections/markdownSlice';
import ApiService from '../../../../../services/api';
import {
  getAllModules,
  getModuleBySlug
} from '../../../../../services/parseMarkdown/modulesMarkdown';
import {
  getTopicBySlug,
  getAllTopicsByModule
} from '../../../../../services/parseMarkdown/topicsMarkdown';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isCompletly, setIsCompletly] = useState(false);
  const [urlCompletly, setUrlComplety] = useState('');

  const getTopicsConcluded = async () => {
    setIsLoading(true);
    await ApiService.get(`/modules/${module.slug}`).then(
      ({ data: responseData }) => {
        const { topics } = responseData.data;
        if (
          !topics.some(topicConclued => topicConclued.topic_slug === topic.slug)
        ) {
          const lastTopic = topics[topics.length - 1];
          if (lastTopic.tasks?.length > 0) {
            const lastTask = lastTopic.tasks[lastTopic.tasks.length - 1];
            const url = `/modulo/${module.slug}/dojo/${lastTopic.topic_slug}/atividade/${lastTask}`;
            setUrlComplety(url);
          }
          const url = `/modulo/${module.slug}/dojo/${lastTopic.topic_slug}`;
          setUrlComplety(url);
        } else {
          setIsCompletly(true);
        }
      }
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getTopicsConcluded();
  }, []);

  return (
    <>
      {isCompletly && (
        <DojoLayout
          moduleTitle={module.title}
          moduleSlug={module.slug}
          listTopics={listTopics}
          topic={topic}
        >
          <Grid
            gap="9rem"
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
              <Box>
                <MarkdownSlice content={topic.content} />
              </Box>
            </Box>
            <Box />
          </Grid>
        </DojoLayout>
      )}
      <Modal
        isCentered
        isOpen={!isCompletly && !isLoading}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign="center"
            backgroundColor="blue.500"
            color="white"
          >
            Tópico não permitido
          </ModalHeader>
          <ModalBody>
            <Text>
              Você ainda não chegou neste tópico, volte para o tópico que você
              parou
            </Text>
          </ModalBody>

          <ModalFooter>
            <Link href={urlCompletly} _focus={{ boxShadow: 'none' }}>
              <Button
                mr={3}
                margin="0.5rem"
                size="sm"
                rounded="md"
                bg="black"
                color="white"
                _hover={{
                  color: 'white',
                  borderColor: 'blue.300',
                  boxShadow: 'outline'
                }}
              >
                Voltar
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
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
