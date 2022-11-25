import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';

const ReminderForm = ({ formik, isLoading, userCalendars = null }) => {
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } = formik;

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        {userCalendars && (
          <FormControl isInvalid={!!errors.calendar && touched.calendar} isRequired>
            <FormLabel htmlFor="calendar">Calendar</FormLabel>
            <Select
              id="calendar"
              name="calendar"
              value={values.calendar}
              onChange={handleChange}
              onBlur={handleBlur}
              variant="filled"
              autoFocus
              focusBorderColor="teal.400"
              placeholder="Select a calendar"
            >
              {userCalendars.map((calendar) => (
                <option key={calendar.id} value={calendar.id}>
                  {calendar.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.calendar}</FormErrorMessage>
          </FormControl>
        )}
        <FormControl isInvalid={!!errors.name && touched.name} isRequired>
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
        <FormControl isInvalid={!!errors.start && touched.start} isRequired>
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
      </VStack>
    </form>
  );
};

export default ReminderForm;
