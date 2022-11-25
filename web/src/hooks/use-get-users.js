import { useEffect, useState } from 'react';

const useGetUsers = (id, query) => {
  const [users, setUsers] = useState([]);
  const { data, isLoading } = query(id);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [setUsers, data]);

  return { isLoading, users };
};

export default useGetUsers;
