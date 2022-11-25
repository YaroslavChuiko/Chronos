import ConfirmationPage from '~/components/ConfirmatioinPage/ConfirmationPage';
import PageAlert from '~/components/PageAlert/PageAlert';
import { useConfirmCalendarMutation } from '~/store/api/apiSlice';

const ConfirmCalendar = () => {
  const AlertError = ({ message }) => (
    <PageAlert status="error" title="Confirmation error!" message={message}></PageAlert>
  );

  const AlertSuccess = () => (
    <PageAlert status="success" title="You have confirmed your invite to the calendar!"></PageAlert>
  );

  return (
    <ConfirmationPage
      useMutation={useConfirmCalendarMutation}
      AlertSuccess={AlertSuccess}
      AlertError={AlertError}
    />
  );
};

export default ConfirmCalendar;
