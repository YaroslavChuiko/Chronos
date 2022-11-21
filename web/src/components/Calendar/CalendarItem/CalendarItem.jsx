import { CloseIcon } from '@chakra-ui/icons';
import { Checkbox, Flex, IconButton } from '@chakra-ui/react';
import { useDeleteCalendarMutation } from '~/store/api/apiSlice';
import { HAS_ADMIN_RIGHTS, IS_MAIN } from '~/consts/calendar';
import useCustomToast from '~/hooks/use-custom-toast';
import styles from './calendar-item.styles';

const CalendarItem = ({ calendar: { id, name, role }, formik }) => {
  const { values, handleChange } = formik;
  const [deleteCalendar, { isLoading }] = useDeleteCalendarMutation();

  const { toast } = useCustomToast();

  const deleteHandler = async () => {
    try {
      await deleteCalendar(id);
      toast('Your calendar was successfully removed!', 'success');
    } catch (err) {
      toast(err.data.message, 'error');
    }
  };

  return (
    <Flex sx={styles.container}>
      <Checkbox
        name={`calendars.${id}`}
        value={values.calendars[id]}
        spacing="1rem"
        size="lg"
        disabled={IS_MAIN(name)}
        defaultChecked={values.calendars[id]}
        colorScheme="yellow"
        onChange={handleChange}
      >
        {name}
      </Checkbox>
      {HAS_ADMIN_RIGHTS(role) && (
        <IconButton
          onClick={deleteHandler}
          sx={styles.icon}
          variant="ghost"
          size="sm"
          icon={<CloseIcon />}
          isLoading={isLoading}
        />
      )}
    </Flex>
  );
};

export default CalendarItem;
