import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '~/components/Loader/Loader';

const ConfirmationPage = ({ useMutation, AlertSuccess, AlertError }) => {
  const [searchParams] = useSearchParams();
  const confirmToken = searchParams.get('confirmToken');
  const [mutation, { isLoading, isError, error }] = useMutation();

  useEffect(() => {
    mutation({ confirmToken });
  }, [mutation, confirmToken]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <AlertError message={error.data.message} />;
  }

  return <AlertSuccess />;
};

export default ConfirmationPage;
