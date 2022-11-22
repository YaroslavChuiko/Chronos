import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import CustomModal from '~/components/CustomModal/CustomModal';
import { COLOR_DEFAULTS } from '~/consts/validation';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateCalendarMutation } from '~/store/api/apiSlice';
import { createSchema } from '~/validation/calendar';

const initialValues = {
  name: '',
  description: '',
  color: COLOR_DEFAULTS.calendar,
};

const CreateCalendarModal = ({ isOpen, onClose }) => {
  const [create, { isLoading }] = useCreateCalendarMutation();
  const { toast } = useCustomToast();

  const close = () => {
    resetForm();
    onClose();
  };

  const onSubmit = async (values) => {
    try {
      await create(values);
      close();
      toast('Your calendar was successfully created!', 'success');
    } catch (err) {
      toast(err.data.message, 'error');
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur, resetForm } = useFormik({
    initialValues,
    validationSchema: createSchema,
    onSubmit,
  });

  return (
    <CustomModal isOpen={isOpen} onClose={close} header="Create a calendar">
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
        </VStack>
      </form>
    </CustomModal>
  );
};

export default CreateCalendarModal;
