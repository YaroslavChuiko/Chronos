import ConfirmationPage from '~/components/ConfirmatioinPage/ConfirmationPage';
import PageAlert from '~/components/PageAlert/PageAlert';
import { useConfirmEventMutation } from '~/store/api/apiSlice';

const ConfirmEmail = () => {
  const AlertError = ({ message }) => (
    <PageAlert status="error" title="Confirmation error!" message={message}></PageAlert>
  );

  const AlertSuccess = () => (
    <PageAlert status="success" title="You have confirmed your invite to the event!"></PageAlert>
  );

  return (
    <ConfirmationPage
      useMutation={useConfirmEventMutation}
      AlertSuccess={AlertSuccess}
      AlertError={AlertError}
    />
  );
};

export default ConfirmEmail;
