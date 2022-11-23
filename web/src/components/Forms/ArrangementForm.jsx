import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateCalendarEventMutation } from '~/store/api/apiSlice';
import { arrangementSchema } from '~/validation/event';

const initialValues = {
  calendar: '',
  name: '',
  content: '',
  start: '',
  end: '',
  color: '#8e24aa',
  type: 'arrangement',
};

const ArrangementForm = ({ onSuccess = null, updatedValues = {}, userCalendars }) => {
  const [createEvent, { isLoading }] = useCreateCalendarEventMutation();
  const { toast } = useCustomToast();

  const formValues = { ...initialValues, ...updatedValues };

  const close = () => {
    resetForm();
    onSuccess && onSuccess();
  };

  const onSubmit = async (values) => {
    try {
      await createEvent(values).unwrap();
      close();
      toast('Your event was successfully created!', 'success');
    } catch (error) {
      toast(error.data.message, 'error');
    }
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: formValues,
    validationSchema: arrangementSchema,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
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
        <FormControl isInvalid={!!errors.end && touched.end} isRequired>
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

export default ArrangementForm;
