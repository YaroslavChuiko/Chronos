import { useFormik } from 'formik';
import { EVENT_TYPE_ENUM } from '~/consts/validation';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateCalendarEventMutation } from '~/store/api/apiSlice';
import { createArrangementSchema } from '~/validation/event';
import ArrangementForm from './ArrangementForm';

const CreateArrangementForm = ({ onSuccess, selectedDate, userCalendars }) => {
  const { toast } = useCustomToast();
  const [createEvent, { isLoading }] = useCreateCalendarEventMutation();

  const initialValues = {
    calendar: '',
    name: '',
    content: '',
    start: selectedDate ? `${selectedDate}T06:00` : '',
    end: selectedDate ? `${selectedDate}T10:00` : '',
    color: '#8e24aa',
    type: EVENT_TYPE_ENUM.arrangement,
  };

  const onSubmit = async (values) => {
    try {
      await createEvent(values).unwrap();
      resetForm();
      onSuccess && onSuccess();
      toast('Your event was successfully created!', 'success');
    } catch (error) {
      toast(error.data.message, 'error');
    }
  };

  const { resetForm, ...formik } = useFormik({
    initialValues,
    validationSchema: createArrangementSchema,
    onSubmit,
  });

  return <ArrangementForm formik={formik} isLoading={isLoading} userCalendars={userCalendars} />;
};

export default CreateArrangementForm;
