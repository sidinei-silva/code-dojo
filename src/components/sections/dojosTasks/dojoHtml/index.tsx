import { Box, Button, Flex, Grid, Text } from '@chakra-ui/core';
import { replace } from 'formik';
import React, { useState } from 'react';

import CodeEditor from '../../codeEditor';
import HtmlViewer from '../../viewersContent/htmlViewer';

interface DojoHtmlProps {
  seed: string;
}

const DojoHtml: React.FC<DojoHtmlProps> = props => {
  const { seed } = props;
  const [content, setContent] = useState(seed);
  return (
    <Grid
      templateRows={{ xs: 'repeat(2, 1fr)', lg: '1fr' }}
      templateColumns={{ lg: 'repeat(2, 1fr)' }}
      gap="1.75rem"
    >
      <Flex direction="column">
        <CodeEditor
          height="400"
          width="550"
          language="html"
          content={content}
          setContent={setContent}
        />
        <Flex>
          <Button
            margin="0.5rem"
            marginLeft="0"
            size="sm"
            rounded="md"
            color="white"
            bg="blue.500"
            _hover={{
              color: 'white',
              borderColor: 'blue.300',
              boxShadow: 'outline'
            }}
          >
            Corrigir
          </Button>
          <Button
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
            onClick={() => setContent(seed)}
          >
            Resetar
          </Button>
        </Flex>
      </Flex>
      <Box shadow="xl" backgroundColor="white">
        <Flex
          width="100%"
          height="3rem"
          backgroundColor="gray.200"
          align="center"
        >
          <Grid
            marginLeft="1rem"
            alignContent="center"
            templateColumns="repeat(3, 1fr)"
            gap="0.5rem"
          >
            <Box
              backgroundColor="red.500"
              borderRadius="100%"
              height="1rem"
              width="1rem"
            />
            <Box
              backgroundColor="yellow.500"
              borderRadius="100%"
              height="1rem"
              width="1rem"
            />
            <Box
              backgroundColor="green.500"
              borderRadius="100%"
              height="1rem"
              width="1rem"
            />
          </Grid>
          <Flex
            align="center"
            marginX="1rem"
            height="75%"
            width="100%"
            borderRadius="1rem"
            backgroundColor="whiteAlpha.900"
          >
            <Text marginLeft="1rem" fontSize="1rem" color="gray.500">
              https://www.code-dojo.com.br/minha-atividade
            </Text>
          </Flex>
        </Flex>
        <HtmlViewer>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </HtmlViewer>
      </Box>
    </Grid>
  );
};

export default DojoHtml;
