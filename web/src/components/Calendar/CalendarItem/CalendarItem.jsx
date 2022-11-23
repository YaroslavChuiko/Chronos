import { CloseIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Checkbox, Flex, IconButton, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { useDeleteCalendarMutation } from '~/store/api/apiSlice';
import { HAS_ADMIN_RIGHTS, IS_MAIN } from '~/consts/calendar';
import useCustomToast from '~/hooks/use-custom-toast';
import styles from './calendar-item.styles';
import UpdateCalendarModal from '~/components/Modal/UpdateCalendarModal';
import CustomPopover from '~/components/CustomPopover/CustomPopover';
import ConfirmPopover from '~/components/CustomPopover/ConfirmPopover';

const CalendarItem = ({ calendar, formik, setFilter }) => {
  const { id, name, role, description } = calendar;
  const { values, handleChange } = formik;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: popoverOpen, onOpen: onPopoverOpen, onClose: onPopoverClose } = useDisclosure();
  const [deleteCalendar, { isLoading }] = useDeleteCalendarMutation();

  const { toast } = useCustomToast();

  const deleteHandler = async () => {
    try {
      await deleteCalendar(id);
      setFilter((state) => ({
        ...state,
        calendars: state.calendars.filter((key) => Number(key) !== id),
      }));
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
        <>
          <ConfirmPopover
            header="Are you sure you want to remove this calendar?"
            trigger={
              <IconButton
                onClick={onPopoverOpen}
                sx={styles.icon}
                variant="ghost"
                size="sm"
                icon={<CloseIcon />}
                isLoading={isLoading}
              />
            }
            isOpen={popoverOpen}
            onConfirm={deleteHandler}
            onClose={onPopoverClose}
          />
          <IconButton
            onClick={onOpen}
            sx={styles.icon}
            variant="ghost"
            size="sm"
            icon={<EditIcon />}
          />
        </>
      )}
      <CustomPopover
        trigger={<IconButton sx={styles.icon} variant="ghost" size="sm" icon={<HamburgerIcon />} />}
        header="Calendar info"
        sx={{ borderColor: calendar.color }}
      >
        <VStack>
          <Text sx={{ width: '100%', fontWeight: 'bold' }}>{name}</Text>
          <Text sx={{ width: '100%' }}>{description}</Text>
          <Text sx={{ width: '100%', fontStyle: 'italic' }}>{`Your role: ${role}`}</Text>
        </VStack>
      </CustomPopover>
      <UpdateCalendarModal calendar={calendar} isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default CalendarItem;
