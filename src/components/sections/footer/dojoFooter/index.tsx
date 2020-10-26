import { Box, Flex, Grid, Text, Button, BoxProps } from '@chakra-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { CgArrowLongRight, CgArrowLongLeft, CgLogOff } from 'react-icons/cg';

interface Topic {
  title: string;
  slug: string;
  description: string;
  order: number;
  content: string;
}

interface FooterDojoProps extends BoxProps {
  listTopics: Array<Topic>;
  moduleSlug: string;
  topic: Topic;
}

const FooterDojo: React.FC<FooterDojoProps> = props => {
  const { listTopics, topic, moduleSlug } = props;
  const router = useRouter();

  const nextTopic = () => {
    const nextUrl = listTopics[topic.order].slug;

    router.push(`/modulo/${moduleSlug}/dojo/${nextUrl}`);
  };

  const previousTopic = () => {
    const previousUrl = listTopics[topic.order - 2].slug;

    router.push(`/modulo/${moduleSlug}/dojo/${previousUrl}`);
  };

  return (
    <Grid
      bottom="0"
      position="absolute"
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
        <Button
          variant="ghost"
          onClick={previousTopic}
          isDisabled={topic.order === 1}
        >
          <Box as={CgArrowLongLeft} size="1.7em" color="black" />
        </Button>
        <Text marginX="1rem">
          {listTopics[topic.order - 1].order}/{listTopics.length}
        </Text>
        <Button
          variant="ghost"
          onClick={nextTopic}
          isDisabled={topic.order === listTopics.length}
        >
          <Box as={CgArrowLongRight} size="1.7em" color="black" />
        </Button>
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
