import {
  Box,
  Flex,
  Text,
  Image,
  Grid,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Heading,
  Divider,
  BoxProps,
  List,
  ListItem,
  ListIcon,
  Link
} from '@chakra-ui/core';
import React from 'react';
import { CgMenuLeftAlt } from 'react-icons/cg';

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
  order: number;
  content: string;
  image: string;
  tasks: Array<Task>;
}

interface HeaderDojoProps extends BoxProps {
  moduleTitle: string;
  moduleSlug: string;
  listTopics: Array<Topic>;
  topic: Topic;
}

const HeaderDojo: React.FC<HeaderDojoProps> = props => {
  const { moduleTitle, listTopics, moduleSlug, topic } = props;
  const {
    isOpen: isOpenList,
    onOpen: onOpenList,
    onClose: onCloseList
  } = useDisclosure();
  const listRef = React.useRef();

  return (
    <Grid
      position="absolute"
      alignItems="center"
      templateColumns="1.7rem 1fr"
      as="nav"
      w="100%"
      paddingX={{ xxl: '330px' }}
      padding={{ xs: '1rem', md: '1.5rem' }}
      backgroundColor="rgba(255,255,255,0.5)"
      color="black"
      boxShadow="md"
      {...props}
    >
      <Flex w="100%" justify="flex-start">
        <Box
          as={CgMenuLeftAlt}
          ref={listRef}
          onClick={onOpenList}
          size="1.7em"
          color="black"
        />
      </Flex>

      <Flex justify="flex-start" justifySelf="center" align="center">
        <Heading color="black" fontSize={{ xs: '1rem', md: '1.5rem' }}>
          {moduleTitle}
        </Heading>
      </Flex>

      <Drawer
        isOpen={isOpenList}
        placement="left"
        onClose={onCloseList}
        finalFocusRef={listRef}
        size="xs"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Flex
            boxShadow="md"
            justify="flex-start"
            paddingY={3}
            paddingX={5}
            align="center"
          >
            <Image w="50px" src="/img/logo_transparent.png" />
          </Flex>

          <DrawerBody marginTop={5}>
            <Flex justify="flex-start" align="center" direction="column">
              <Image
                src={topic.image}
                borderRadius="18px"
                backgroundColor="blue.500"
                padding="1rem"
                maxWidth="5rem"
                marginBottom="1rem"
              />
              <Heading fontSize="1.2rem" textAlign="center">
                {moduleTitle}
              </Heading>
            </Flex>

            <Flex justify="flex-start" align="center" direction="column">
              <Divider width="100%" marginY={5} />
              <Heading fontSize="0.5">Tópicos</Heading>
            </Flex>

            <Box marginTop="1.75rem">
              <List spacing={3}>
                {listTopics.map(topicList => (
                  <ListItem key={topicList.slug}>
                    <Link href={`/modulo/${moduleSlug}/dojo/${topicList.slug}`}>
                      <Flex marginBottom={2}>
                        <ListIcon icon="check-circle" color="green.500" />{' '}
                        <Text>
                          {topicList.order} - {topicList.title}
                        </Text>
                      </Flex>
                    </Link>
                    {topicList.tasks.map(taskList => (
                      <List
                        marginLeft="1rem"
                        key={topicList.slug + taskList.order}
                      >
                        <ListItem marginTop="0.3rem">
                          <Link
                            href={`/modulo/${moduleSlug}/dojo/${topicList.slug}/atividade/${taskList.order}`}
                          >
                            <Flex>
                              <ListIcon
                                size="0.8rem"
                                icon="check-circle"
                                color="green.500"
                              />
                              <Text>{taskList.title}</Text>
                            </Flex>
                          </Link>
                        </ListItem>
                      </List>
                    ))}
                  </ListItem>
                ))}
              </List>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Text as="h1">Code Dojo</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Grid>
  );
};

export default HeaderDojo;
