import { useFormik } from 'formik';
import moment from 'moment';
import useCustomToast from '~/hooks/use-custom-toast';
import { useUpdateCalendarEventMutation } from '~/store/api/apiSlice';
import { updateReminderSchema } from '~/validation/event';
import ReminderForm from './ReminderForm';

const UpdateReminderForm = ({ event, onSuccess }) => {
  const { toast } = useCustomToast();
  const [updateEvent, { isLoading }] = useUpdateCalendarEventMutation();

  const initialValues = {
    name: event.title,
    content: event.content,
    start: moment(event.start).format('YYYY-MM-DDThh:mm'),
    color: event.color,
  };

  const onSubmit = async ({ name, content, start, color }) => {
    try {
      const data = {
        name,
        content,
        color,
        start,
        end: moment(start).minutes(moment(start).minutes() + 5), // end it's start + 5 min
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
    validationSchema: updateReminderSchema,
    onSubmit,
  });

  return <ReminderForm formik={formik} isLoading={isLoading} />;
};

export default UpdateReminderForm;
