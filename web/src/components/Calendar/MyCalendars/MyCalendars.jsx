import { Checkbox, Flex, StackDivider, Text, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { CALENDAR_LABELS as labels, holidays } from '~/consts/calendar';
import initial from './const';
import styles from './my-calendars.styles';

const MyCalendars = ({ calendars, setCalendarIDs }) => {
  const { values, handleChange } = useFormik({
    initialValues: {
      ...initial(calendars),
    },
  });

  useEffect(() => {
    setCalendarIDs(
      Object.entries(values)
        .filter(([_, v]) => v)
        .map(([k]) => k),
    );
  }, [values, setCalendarIDs]);

  return (
    <VStack sx={styles.calendars} spacing={4} divider={<StackDivider borderColor="gray.200" />}>
      <Flex sx={styles.subContainer}>
        <Text fontSize="xl">{labels.my}</Text>
        {calendars.map((c) => (
          <Checkbox
            name={c.id}
            value={values[c.id]}
            key={c.id}
            spacing="1rem"
            size="lg"
            defaultChecked={values[c.id]}
            sx={styles.checkbox}
            colorScheme="yellow"
            onChange={handleChange}
          >
            {c.name}
          </Checkbox>
        ))}
      </Flex>
      <Flex sx={styles.subContainer}>
        <Text fontSize="xl">{labels.other}</Text>
        <Checkbox
          spacing="1rem"
          size="lg"
          defaultChecked={!holidays.hidden}
          sx={styles.checkbox}
          colorScheme="green"
        >
          {holidays.name}
        </Checkbox>
      </Flex>
    </VStack>
  );
};

export default MyCalendars;
