import { CheckIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  Select,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import useCustomToast from '~/hooks/use-custom-toast';
import useGetUsers from '~/hooks/use-get-users';
import { useGetCalendarInvitedQuery, useShareCalendarMutation } from '~/store/api/apiSlice';
import Loader from '../Loader/Loader';

const ShareCalendarForm = ({ calendar: { id } }) => {
  const { users } = useGetUsers(id);
  const { data: invited, isLoading: invitedLoading } = useGetCalendarInvitedQuery(id);
  const [share, { isLoading }] = useShareCalendarMutation();
  const { toast } = useCustomToast();

  const { values, handleChange, handleBlur, handleSubmit, resetForm } = useFormik({
    initialValues: { email: '' },
    onSubmit: async ({ email }) => {
      try {
        await share({ id, email });
        resetForm();
        toast(`An invite to this calendar was sent to ${email}.`, 'success');
      } catch (err) {
        toast(err.data.message, 'error');
      }
    },
  });

  return (
    <VStack spacing={4} sx={{ width: '100%' }}>
      {invited && invited.length ? (
        <>
          <Text sx={{ fontWeight: 'semibold', width: '100%' }}>The calendar is shared with:</Text>
          <List spacing={3} sx={{ width: '100%' }}>
            {invited.map((u) => (
              <ListItem key={u.id}>
                {u.isConfirmed && <ListIcon as={CheckIcon} color="green.500" />}
                {u.email}
              </ListItem>
            ))}
          </List>
        </>
      ) : invitedLoading ? (
        <Loader isFullScreen={false} />
      ) : (
        <></>
      )}
      <Flex sx={{ alignItems: 'flex-end', width: '100%' }}>
        <FormControl>
          <FormLabel htmlFor="email">Share your calendar</FormLabel>
          <Select
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            placeholder="Select a user to invite"
          >
            {users ? (
              users.map((u) => (
                <option key={u.id} value={u.email}>
                  {u.email}
                </option>
              ))
            ) : (
              <></>
            )}
          </Select>
        </FormControl>
        <Button
          onClick={handleSubmit}
          variant="outline"
          colorScheme="yellow"
          size="sm"
          sx={{ marginLeft: '10px' }}
          isLoading={isLoading}
        >
          Share
        </Button>
      </Flex>
    </VStack>
  );
};

export default ShareCalendarForm;
