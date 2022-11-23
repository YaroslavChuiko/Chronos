import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import ShareCalendarForm from './ShareCalendarForm';

const CalendarForm = ({ formik, isLoading, calendar = null }) => {
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.name && touched.name} isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="filled"
            focusBorderColor="teal.400"
            placeholder="Add a name"
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.description && touched.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            description="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="filled"
            focusBorderColor="teal.400"
            placeholder="Add a description"
          />
          <FormErrorMessage>{errors.description}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.color && touched.color} isRequired>
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
          isLoading={isLoading}
          loadingText="Submitting"
          spinnerPlacement="end"
          colorScheme="yellow"
        >
          Save
        </Button>
        {calendar && <ShareCalendarForm calendar={calendar} />}
      </VStack>
    </form>
  );
};

export default CalendarForm;
