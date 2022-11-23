import { useEffect, useState } from 'react';
import { useGetUsersQuery } from '~/store/api/apiSlice';

const useGetUsers = (calendarId) => {
  const [users, setUsers] = useState([]);
  const { data, isLoading } = useGetUsersQuery(calendarId);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  });

  return { isLoading, users };
};

export default useGetUsers;
