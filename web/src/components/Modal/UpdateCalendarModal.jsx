import { useFormik } from 'formik';
import CustomModal from '~/components/CustomModal/CustomModal';
import useCustomToast from '~/hooks/use-custom-toast';
import { useUpdateCalendarMutation } from '~/store/api/apiSlice';
import { createSchema } from '~/validation/calendar';
import CalendarForm from '../Forms/CalendarForm';

const UpdateCalendarModal = ({ isOpen, onClose, calendar }) => {
  const { id, name, description, color } = calendar;
  const initialValues = { name, description, color };

  const [update, { isLoading }] = useUpdateCalendarMutation();
  const { toast } = useCustomToast();

  const close = () => {
    resetForm();
    onClose();
  };

  const onSubmit = async (body) => {
    try {
      await update({ id, body });
      close();
      toast('Your calendar was successfully updated!', 'success');
    } catch (err) {
      toast(err.data.message, 'error');
    }
  };

  const { resetForm, ...formik } = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: createSchema,
    onSubmit,
  });

  return (
    <CustomModal isOpen={isOpen} onClose={close} header="Update the calendar">
      <CalendarForm formik={formik} isLoading={isLoading} calendar={calendar} />
    </CustomModal>
  );
};

export default UpdateCalendarModal;
