/* eslint-disable react/no-children-prop */
import { Heading, Image, Flex, Text } from '@chakra-ui/core';
import React from 'react';
import { CodeBlock, dracula } from 'react-code-blocks';
import ReactMarkdown from 'react-markdown';

// import { Container } from './styles';

interface MarkdownSliceProps {
  content: string;
}

const MarkdownSlice: React.FC<MarkdownSliceProps> = ({ content }) => {
  const renderers = {
    paragraph: paragraph => {
      return (
        <Text fontSize="1rem" color="black">
          {paragraph.children}
        </Text>
      );
    },
    heading: heading => {
      return <Heading>{heading.children}</Heading>;
    },
    image: image => {
      return (
        <Flex justify="center">
          <Image src={image.src} padding="1em" maxWidth="16rem" />
        </Flex>
      );
    },
    code: code => {
      const refactoreLanguage = language => {
        if (language === 'html' || language === 'xml') {
          return 'jsx';
        }
        return language;
      };

      return (
        <CodeBlock
          text={code.value}
          language={refactoreLanguage(code.language)}
          showLineNumbers={false}
          theme={dracula}
        />
      );
    }
  };
  return <ReactMarkdown renderers={renderers} children={content} />;
};

export default MarkdownSlice;
