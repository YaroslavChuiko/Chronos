import { useFormik } from 'formik';
import CustomModal from '~/components/CustomModal/CustomModal';
import { COLOR_DEFAULTS } from '~/consts/validation';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateCalendarMutation } from '~/store/api/apiSlice';
import { createSchema } from '~/validation/calendar';
import CalendarForm from '../Forms/CalendarForm';

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

  const { resetForm, ...formik } = useFormik({
    initialValues,
    validationSchema: createSchema,
    onSubmit,
  });

  return (
    <CustomModal isOpen={isOpen} onClose={close} header="Create a calendar">
      <CalendarForm formik={formik} isLoading={isLoading} />
    </CustomModal>
  );
};

export default CreateCalendarModal;
