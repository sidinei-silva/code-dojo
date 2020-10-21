/* eslint-disable react/no-unescaped-entities */
import {
  Grid,
  Heading,
  Image,
  Text,
  Box,
  Button,
  Flex,
  PseudoBox
} from '@chakra-ui/core';
import Link from 'next/link';
import React from 'react';

interface CardModuleProps {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
}

const CardModule: React.FC<CardModuleProps> = props => {
  const {
    title = 'Em breve',
    description = 'Aguarde em breve teremos novidades',
    image = '/svg/clock.svg',
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
          height="15rem"
          width={{ xs: 'auto', lg: '24rem' }}
          maxWidth="24rem"
          padding="1.9rem"
          templateRows="repeat(2, 1fr)"
          alignItems="center"
          justifyItems="center"
          gap="1rem"
          overflowX="auto"
        >
          <Grid templateColumns="3rem 1fr" alignItems="center" gap="1rem">
            <Image
              borderRadius="100%"
              backgroundColor="blue.500"
              padding="8px"
              src={image}
              maxWidth="2.5rem"
            />
            <Heading fontSize="1.5em">{title}</Heading>
          </Grid>
          <Text
            color="gray.500"
            fontSize="1.1rem"
            textAlign="justify"
            lineHeight="1.5rem"
          >
            {description}
          </Text>
        </Grid>
      </Link>
    </PseudoBox>
  );
};

export default CardModule;
