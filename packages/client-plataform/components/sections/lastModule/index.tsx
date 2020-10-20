/* eslint-disable react/no-unescaped-entities */
import { Button, Grid, Heading, Image, Text } from '@chakra-ui/core';
import Link from 'next/link';
import React from 'react';

interface LastModuleProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const LastModule: React.FC<LastModuleProps> = props => {
  const { title, description, image, link } = props;
  return (
    <Grid
      borderRadius="6px"
      maxWidth="700px"
      padding="1.9rem"
      backgroundColor="rgba(206, 217, 235, 0.5)"
      templateColumns={{ lg: '8rem 1fr ' }}
      alignItems="center"
      justifyItems="center"
      gap="1.9rem"
    >
      <Image
        borderRadius="18px"
        backgroundColor="blue.500"
        padding="30px"
        src={image}
        maxWidth="8rem"
      />
      <Grid justifyItems="center" gap="1.8rem">
        <Heading fontSize="1.5em">{title}</Heading>
        <Text color="gray.500" textAlign="justify" lineHeight="1.75rem">
          {description}
        </Text>
        <Button
          w="8.75rem"
          size="md"
          bg="black"
          color="white"
          _hover={{ boxShadow: 'outline' }}
          _focus={{ boxShadow: 'outiline' }}
        >
          <Link href={link}>Continuar</Link>
        </Button>
      </Grid>
    </Grid>
  );
};

export default LastModule;
