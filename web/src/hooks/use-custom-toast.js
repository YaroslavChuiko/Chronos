import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

const useCustomToast = () => {
  const createToast = useToast();

  const toast = useCallback(
    (description, status) => {
      createToast({
        description,
        duration: 9000,
        isClosable: true,
        status,
      });
    },
    [createToast],
  );

  return { toast };
};

export default useCustomToast;
