import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Grid,
  Flex,
  Box,
  BoxProps,
  useToast
} from '@chakra-ui/core';
import { Formik, Field } from 'formik';
import React from 'react';

import useAuth from '../../../../contexts/auth';
import Api from '../../../../services/api';
import Input from '../../input';
import userSchema from './userSchema';

const FormSignUp: React.FC<BoxProps> = boxProps => {
  const toast = useToast();
  const { login } = useAuth();
  return (
    <Box {...boxProps}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={userSchema}
        onSubmit={async (values, actions) => {
          await new Promise(resolve => setTimeout(resolve, 500));

          await Api.post('users/register', {
            ...values
          })
            .then(async response => {
              if (
                response.status === 200 &&
                response.data.data.email === values.email
              ) {
                await login(values.email, values.password);
              }
            })
            .catch(err => {
              toast({
                title: 'Ops...',
                description: err.response.data.message || '',
                status: 'error',
                duration: 9000,
                isClosable: true
              });
            });
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Grid gap={6}>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name" color="black">
                      Nome
                    </FormLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Digite aqui seu nome"
                      type="text"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="email" validate>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email" color="black">
                      Email
                    </FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Digite aqui seu email"
                      type="email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password" validate>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel htmlFor="password" color="black">
                      Senha
                    </FormLabel>
                    <Input
                      {...field}
                      id="password"
                      placeholder="Crie uma senha"
                      type="password"
                    />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Flex justify="center">
                <Button
                  w="200px"
                  mt={{ base: 3, md: 8 }}
                  size="md"
                  bg="black"
                  color="white"
                  isLoading={props.isSubmitting}
                  type="submit"
                  _hover={{ boxShadow: 'outline' }}
                  _focus={{ boxShadow: 'outiline' }}
                  isDisabled={!props.isValid}
                >
                  Cadastrar-se
                </Button>
              </Flex>
            </Grid>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default FormSignUp;
