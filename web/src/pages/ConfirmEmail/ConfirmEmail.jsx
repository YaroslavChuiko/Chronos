import ConfirmationPage from '~/components/ConfirmatioinPage/ConfirmationPage';
import { useConfirmEmailMutation } from '~/store/api/authSlice';
import AlertError from './components/AlertError';
import AlertSuccess from './components/AlertSuccess';

const ConfirmEmail = () => {
  return (
    <ConfirmationPage
      useMutation={useConfirmEmailMutation}
      AlertSuccess={AlertSuccess}
      AlertError={AlertError}
    />
  );
};

export default ConfirmEmail;
