import { Box, Flex, Grid, Text, Button, BoxProps, Link } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { CgArrowLongRight, CgArrowLongLeft, CgLogOff } from 'react-icons/cg';

interface Task {
  title: string;
  topic: string;
  description: string;
  order: number;
  content: string;
}

interface Topic {
  title: string;
  slug: string;
  description: string;
  order: number;
  content: string;
  tasks: Array<Task>;
}

interface FooterDojoProps extends BoxProps {
  listTopics: Array<Topic>;
  moduleSlug: string;
  topic: Topic;
}

const FooterDojo: React.FC<FooterDojoProps> = props => {
  const { listTopics, topic, moduleSlug } = props;
  const router = useRouter();

  const currentPath = router.asPath;

  const pathsTopicsAndTaks = [].concat(
    ...listTopics.map(topicList => {
      const pathTopic = `/modulo/${moduleSlug}/dojo/${topicList.slug}`;
      return [
        pathTopic,
        ...topicList.tasks.map(
          taskList =>
            `/modulo/${moduleSlug}/dojo/${topicList.slug}/atividade/${taskList.order}`
        )
      ];
    })
  );

  const nextUrl =
    pathsTopicsAndTaks[pathsTopicsAndTaks.indexOf(currentPath) + 1];

  const previousUrl =
    pathsTopicsAndTaks[pathsTopicsAndTaks.indexOf(currentPath) - 1];

  return (
    <Grid
      bottom="0"
      position="fixed"
      alignItems="center"
      templateColumns="repeat(3, 1fr)"
      as="nav"
      w="100%"
      paddingX={{ xxl: '330px' }}
      backgroundColor="rgba(255,255,255,0.5)"
      color="black"
      boxShadow="md"
      height="3.75rem"
      {...props}
    >
      <Flex justify="flex-start" justifySelf="center" align="center" />
      <Flex justify="center" justifySelf="center" align="center">
        <Link href={previousUrl}>
          <Button
            variant="ghost"
            isDisabled={pathsTopicsAndTaks.indexOf(currentPath) === 0}
          >
            <Box as={CgArrowLongLeft} size="1.7em" color="black" />
          </Button>
        </Link>
        <Text marginX="1rem">
          {pathsTopicsAndTaks.indexOf(currentPath) + 1}/
          {pathsTopicsAndTaks.length}
        </Text>
        <Link href={nextUrl}>
          <Button
            variant="ghost"
            isDisabled={
              pathsTopicsAndTaks.indexOf(currentPath) + 1 ===
              pathsTopicsAndTaks.length
            }
          >
            <Box as={CgArrowLongRight} size="1.7em" color="black" />
          </Button>
        </Link>
      </Flex>
      <Flex justify="center" justifySelf="center" align="flex-start">
        <Button variant="ghost">
          <Link href="/dashboard">
            <Box as={CgLogOff} size="1.7em" color="black" />
          </Link>
        </Button>
      </Flex>
    </Grid>
  );
};

export default FooterDojo;
