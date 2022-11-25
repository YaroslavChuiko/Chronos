import { useFormik } from 'formik';
import { EVENT_TYPE_ENUM } from '~/consts/validation';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateCalendarEventMutation } from '~/store/api/apiSlice';
import { createTaskSchema } from '~/validation/event';
import TaskForm from './TaskForm';

const CreateTaskForm = ({ onSuccess, selectedDate, userCalendars }) => {
  const { toast } = useCustomToast();
  const [createEvent, { isLoading }] = useCreateCalendarEventMutation();

  const initialValues = {
    calendar: '',
    name: '',
    content: '',
    date: selectedDate || '',
    color: '#8eaaaa',
    type: EVENT_TYPE_ENUM.task,
  };

  const onSubmit = async ({ calendar, name, content, date, color, type }) => {
    try {
      const data = {
        calendar,
        name,
        content,
        color,
        type,
        start: `${date}T02:00`, // database save as 00:00
        end: `${date}T24:00`, // database save as 22:00
      };
      await createEvent(data).unwrap();
      resetForm();
      onSuccess && onSuccess();
      toast('Your event was successfully created!', 'success');
    } catch (error) {
      toast(error.data.message, 'error');
    }
  };

  const { resetForm, ...formik } = useFormik({
    initialValues,
    validationSchema: createTaskSchema,
    onSubmit,
  });

  return <TaskForm formik={formik} isLoading={isLoading} userCalendars={userCalendars} />;
};

export default CreateTaskForm;
