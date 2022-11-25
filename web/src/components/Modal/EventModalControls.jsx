import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Flex, IconButton, useDisclosure } from '@chakra-ui/react';
import useCustomToast from '~/hooks/use-custom-toast';
import { useDeleteCalendarEventMutation } from '~/store/api/apiSlice';
import ConfirmPopover from '../CustomPopover/ConfirmPopover';
import ShareEventForm from '~/components/Forms/ShareEventForm';

const EventModalControls = ({ isEditMode, setIsEditMode, onClose, calendarId, eventId }) => {
  const { isOpen: popoverOpen, onOpen: onPopoverOpen, onClose: onPopoverClose } = useDisclosure();
  const [deleteEvent, { isLoading }] = useDeleteCalendarEventMutation();

  const { toast } = useCustomToast();

  const deleteHandler = async () => {
    try {
      await deleteEvent({ calendarId, eventId }).unwrap();
      onClose();
      toast('Event was successfully removed!', 'success');
    } catch (err) {
      toast(err.data.message, 'error');
    }
  };

  const onEditClick = (e) => {
    e.preventDefault();
    setIsEditMode((prevVal) => !prevVal);
  };

  return (
    <Flex mb="20px" sx={{ flexDir: 'column', alignItems: 'flex-start' }}>
      <Flex>
        <IconButton
          variant="ghost"
          colorScheme="blackAlpha"
          icon={isEditMode ? <ViewIcon /> : <EditIcon />}
          onClick={onEditClick}
        />
        <ConfirmPopover
          header="Are you sure you want to remove this event?"
          trigger={
            <IconButton
              onClick={onPopoverOpen}
              variant="ghost"
              colorScheme="blackAlpha"
              icon={<DeleteIcon />}
              isLoading={isLoading}
            />
          }
          isOpen={popoverOpen}
          onConfirm={deleteHandler}
          onClose={onPopoverClose}
        />
      </Flex>
      <ShareEventForm id={eventId} />
    </Flex>
  );
};

export default EventModalControls;
