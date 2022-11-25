import { useFormik } from 'formik';
import moment from 'moment';
import { EVENT_TYPE_ENUM } from '~/consts/validation';
import useCustomToast from '~/hooks/use-custom-toast';
import { useCreateCalendarEventMutation } from '~/store/api/apiSlice';
import { createReminderSchema } from '~/validation/event';
import ReminderForm from './ReminderForm';

const CreateReminderForm = ({ onSuccess, selectedDate, userCalendars }) => {
  const { toast } = useCustomToast();
  const [createEvent, { isLoading }] = useCreateCalendarEventMutation();

  const initialValues = {
    calendar: '',
    name: '',
    content: '',
    start: selectedDate ? `${selectedDate}T10:00` : '',
    color: '#fb2d2d',
    type: EVENT_TYPE_ENUM.reminder,
  };

  const onSubmit = async ({ calendar, name, content, color, type, start }) => {
    try {
      const data = {
        calendar,
        name,
        content,
        color,
        type,
        start,
        end: moment(start).minutes(moment(start).minutes() + 5), // end it's start + 5 min
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
    validationSchema: createReminderSchema,
    onSubmit,
  });

  return <ReminderForm formik={formik} isLoading={isLoading} userCalendars={userCalendars} />;
};

export default CreateReminderForm;
