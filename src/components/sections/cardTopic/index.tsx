/* eslint-disable react/no-unescaped-entities */
import { Grid, Heading, Text, PseudoBox } from '@chakra-ui/core';
import Link from 'next/link';
import React from 'react';

interface CardTopicProps {
  title?: string;
  description?: string;
  link?: string;
}

const CardTopic: React.FC<CardTopicProps> = props => {
  const {
    title = 'Em breve',
    description = 'Aguarde em breve teremos novidades',
    link = '/'
  } = props;
  return (
    <PseudoBox
      role="group"
      borderRadius="0.5rem"
      cursor="pointer"
      _hover={{ bg: 'blue.200' }}
      backgroundColor="rgba(206, 217, 235, 0.5)"
    >
      <Link href={link}>
        <Grid
          height="13rem"
          width={{ xs: 'auto', lg: '20rem' }}
          maxWidth="20rem"
          padding="1.9rem"
          templateRows="repeat(2, 1fr)"
          alignItems="center"
          justifyItems="center"
          gap="1rem"
          overflowX="auto"
        >
          <Heading fontSize="1.5em">{title}</Heading>
          <Text
            alignSelf="flex-start"
            color="black"
            fontSize="1.1rem"
            textAlign="center"
            lineHeight="1.5rem"
          >
            {description}
          </Text>
        </Grid>
      </Link>
    </PseudoBox>
  );
};

export default CardTopic;
