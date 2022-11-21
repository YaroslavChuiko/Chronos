import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import React from 'react';
import useCustomToast from '~/hooks/use-custom-toast';
import { arrangementSchema } from '~/validation/event';

const ArrangementForm = ({ onClose, initialDate }) => {
  // const [login, { isLoading }] = useLoginMutation();
  const { toast } = useCustomToast();

  const initialValues = {
    name: '',
    content: '',
    start: `${initialDate}T06:00`,
    end: `${initialDate}T10:00`,
    color: '#8e24aa',
    type: 'arrangement',
  };

  const onSubmit = async (values) => {
    console.log(values);
    try {
      // await login(values).unwrap();
    } catch (error) {
      toast(error.data.message, 'error');
    }
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: arrangementSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.name && touched.name}>
          <FormLabel htmlFor="name">Title</FormLabel>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="filled"
            focusBorderColor="teal.400"
            placeholder="Add title"
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.content && touched.content}>
          <FormLabel htmlFor="content">Content</FormLabel>
          <Textarea
            id="content"
            name="content"
            value={values.content}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="filled"
            focusBorderColor="teal.400"
            placeholder="Here is a sample placeholder"
            size="sm"
            resize="none"
          />
          <FormErrorMessage>{errors.content}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.start && touched.start}>
          <FormLabel htmlFor="start">Start at</FormLabel>
          <Input
            id="start"
            name="start"
            type="datetime-local"
            value={values.start}
            onChange={handleChange}
            onBlur={handleBlur}
            focusBorderColor="teal.400"
            variant="filled"
            placeholder="Select Date and Time"
          />
          <FormErrorMessage>{errors.start}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.end && touched.end}>
          <FormLabel htmlFor="end">End at</FormLabel>
          <Input
            id="end"
            name="end"
            type="datetime-local"
            value={values.end}
            onChange={handleChange}
            onBlur={handleBlur}
            focusBorderColor="teal.400"
            variant="filled"
            placeholder="Select Time"
          />
          <FormErrorMessage>{errors.end}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.color && touched.color}>
          <FormLabel htmlFor="color">Color</FormLabel>
          <Input
            id="color"
            name="color"
            type="color"
            value={values.color}
            onChange={handleChange}
            onBlur={handleBlur}
            focusBorderColor="teal.400"
            variant="filled"
            placeholder="color hex"
          />
          <FormErrorMessage>{errors.color}</FormErrorMessage>
        </FormControl>
        <Button
          type="submit"
          // isLoading={isLoading}
          loadingText="Submitting"
          spinnerPlacement="end"
          colorScheme="yellow"
        >
          Save
        </Button>
      </VStack>
    </form>
  );
};

export default ArrangementForm;
