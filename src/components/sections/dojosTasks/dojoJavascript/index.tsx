import {
  Box,
  Button,
  Flex,
  Grid,
  GridProps,
  Text,
  CircularProgress,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/core';
import axios from 'axios';
import React, { KeyboardEvent, useState } from 'react';
import { VscScreenFull, VscScreenNormal } from 'react-icons/vsc';

import executeCode from '../../../../lib/runners/javacsript/execute';
import CodeEditor from '../../codeEditor';
import ConsoleJavascriptViewer, {
  addConsole,
  clearConsole
} from '../../viewersContent/consoleJavascriptViewer';

interface DojoJavascriptProps {
  seed: string;
  ruleTask: string;
  moduleSlug: string;
}

const DojoJavascript: React.FC<DojoJavascriptProps> = props => {
  const { seed, ruleTask, moduleSlug } = props;
  const [content, setContent] = useState(seed);
  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataCheckTask, setDataCheckTask] = useState({
    message: '',
    line: null,
    result: false
  });

  const checkTask = async contentCode => {
    const data = await axios
      .post('/api/checkTask/javascriptTask', {
        code: JSON.stringify(contentCode),
        ruleTask,
        module: moduleSlug
      })
      .then(response => response.data)
      .catch(err => console.error(err));
    setDataCheckTask(data);
  };

  const runCode = async () => {
    setLoading(true);
    await checkTask(content);
    addConsole();
    await executeCode(content);
    setLoading(false);
    onOpen();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      runCode();
    }
  };

  const gridFullScreenProps: GridProps = {
    position: 'fixed',
    backgroundColor: 'blue.200',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    padding: '1rem',
    zIndex: 2
  };

  return (
    <Grid
      {...(fullScreen && gridFullScreenProps)}
      templateRows={{ xs: 'repeat(2, 1fr)', lg: '1fr' }}
      templateColumns={{ lg: 'repeat(2, 1fr)' }}
      gap="1.75rem"
      marginBottom={{ base: '0', xl: '4.5rem', xxl: '0' }}
    >
      <Flex direction="column">
        <Box onKeyDown={handleKeyDown} height="100%" width="100%">
          <CodeEditor
            {...(fullScreen && { height: '100%', width: '100%' })}
            language="javascript"
            content={content}
            setContent={setContent}
          />
        </Box>

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
            onClick={runCode}
            isLoading={loading}
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
            isLoading={loading}
          >
            Resetar
          </Button>
          <Button
            margin="0.5rem"
            size="sm"
            rounded="md"
            bg="red.500"
            color="white"
            _hover={{
              color: 'white',
              borderColor: 'blue.300',
              boxShadow: 'outline'
            }}
            onClick={() => clearConsole()}
            isLoading={loading}
          >
            Limpar console
          </Button>
          <Button
            margin="0.5rem"
            size="sm"
            rounded="md"
            bg="blue.700"
            color="white"
            _hover={{
              color: 'white',
              borderColor: 'blue.300',
              boxShadow: 'outline'
            }}
            onClick={() => setFullScreen(!fullScreen)}
          >
            <Box
              size="1.5rem"
              as={fullScreen ? VscScreenNormal : VscScreenFull}
            />
          </Button>
        </Flex>
      </Flex>
      <Box shadow="xl" backgroundColor="white" width="100%">
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
        {loading && (
          <Flex
            align="center"
            height={fullScreen ? '90vh' : '25rem'}
            justify="center"
          >
            <CircularProgress isIndeterminate color="blue" />
          </Flex>
        )}
        <ConsoleJavascriptViewer
          display={loading ? 'none' : 'block'}
          maxHeight={fullScreen ? '90vh' : '25rem'}
        />
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            backgroundColor={dataCheckTask.result ? 'green.500' : 'red.500'}
            color="white"
          >
            Resultado
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{dataCheckTask.message}</Text>
            {dataCheckTask.line && (
              <Text>
                Linha:{' '}
                <Text as="span" color="red.500">
                  {dataCheckTask.line}
                </Text>
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
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
              onClick={onClose}
            >
              Fechar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default DojoJavascript;
