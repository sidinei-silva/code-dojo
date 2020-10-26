import { Flex, BoxProps } from '@chakra-ui/core';
import React from 'react';

import FooterDojo from '../../sections/footer/dojoFooter';
import HeaderDojo from '../../sections/header/dojoHeader';

interface Topic {
  title: string;
  slug: string;
  description: string;
  order: number;
  content: string;
  image: string;
}

interface DojoLayoutProps extends BoxProps {
  moduleTitle: string;
  moduleSlug: string;
  listTopics: Array<Topic>;
  topic: Topic;
}

const DojoLayout: React.FC<DojoLayoutProps> = props => {
  const { children, moduleTitle, listTopics, topic, moduleSlug } = props;

  return (
    <Flex direction="column" align="center" m="0 auto" {...props}>
      <HeaderDojo
        moduleTitle={moduleTitle}
        moduleSlug={moduleSlug}
        listTopics={listTopics}
        topic={topic}
      />
      <Flex
        backgroundImage="url('/img/bg3.png')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        paddingTop="110px"
        paddingX={{ base: '25px', xxl: '300px' }}
        w="100%"
        justify="center"
        minHeight="100vh"
      >
        {children}
      </Flex>
      <FooterDojo
        listTopics={listTopics}
        topic={topic}
        moduleSlug={moduleSlug}
      />
    </Flex>
  );
};

export default DojoLayout;
