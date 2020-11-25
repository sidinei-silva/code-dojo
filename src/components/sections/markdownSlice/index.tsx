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
      let headingSize;
      let headingVariant;
      switch (heading.level) {
        case 1:
          headingSize = '2xl';
          headingVariant = 'h1';
          break;
        case 2:
          headingSize = 'xl';
          headingVariant = 'h2';
          break;
        case 3:
          headingSize = 'lg';
          headingVariant = 'h3';
          break;
        case 4:
          headingSize = 'md';
          headingVariant = 'h4';
          break;
        case 5:
          headingSize = 'sm';
          headingVariant = 'h5';
          break;
        case 6:
          headingSize = 'xs';
          headingVariant = 'h5';
          break;
        default:
          headingSize = '';
          headingVariant = '';
          break;
      }
      return (
        <Heading as={headingVariant} size={headingSize}>
          {heading.children}
        </Heading>
      );
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
