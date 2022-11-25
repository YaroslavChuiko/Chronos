import { useFormik } from 'formik';
import moment from 'moment';
import useCustomToast from '~/hooks/use-custom-toast';
import { useUpdateCalendarEventMutation } from '~/store/api/apiSlice';
import { updateArrangementSchema } from '~/validation/event';
import ArrangementForm from './ArrangementForm';

const UpdateArrangementForm = ({ event, onSuccess }) => {
  const { toast } = useCustomToast();
  const [updateEvent, { isLoading }] = useUpdateCalendarEventMutation();

  const initialValues = {
    name: event.title,
    content: event.content,
    start: moment(event.start).format('YYYY-MM-DDThh:mm'),
    end: moment(event.end).format('YYYY-MM-DDThh:mm'),
    color: event.color,
  };

  const onSubmit = async (values) => {
    try {
      const data = {
        ...values,
        calendarId: event.calendarId,
        eventId: event.eventId,
      };
      await updateEvent(data).unwrap();
      resetForm();
      onSuccess && onSuccess();
      toast('Your event was successfully updated!', 'success');
    } catch (error) {
      toast(error.data.message, 'error');
    }
  };

  const { resetForm, ...formik } = useFormik({
    initialValues,
    validationSchema: updateArrangementSchema,
    onSubmit,
  });

  return <ArrangementForm formik={formik} isLoading={isLoading} />;
};

export default UpdateArrangementForm;
