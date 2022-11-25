import { useFormik } from 'formik';
import moment from 'moment';
import useCustomToast from '~/hooks/use-custom-toast';
import { useUpdateCalendarEventMutation } from '~/store/api/apiSlice';
import { updateTaskSchema } from '~/validation/event';
import TaskForm from './TaskForm';

const UpdateTaskForm = ({ event, onSuccess }) => {
  const { toast } = useCustomToast();
  const [updateEvent, { isLoading }] = useUpdateCalendarEventMutation();

  const initialValues = {
    name: event.title,
    content: event.content,
    date: moment(event.start).format('YYYY-MM-DD'),
    color: event.color,
  };

  const onSubmit = async ({ name, content, date, color }) => {
    try {
      const data = {
        name,
        content,
        color,
        start: `${date}T02:00`, // database save as 00:00
        end: `${date}T24:00`, // database save as 22:00
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
    validationSchema: updateTaskSchema,
    onSubmit,
  });

  return <TaskForm formik={formik} isLoading={isLoading} />;
};

export default UpdateTaskForm;
