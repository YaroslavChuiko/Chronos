import { Checkbox, Flex, StackDivider, Text, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { CALENDAR_LABELS as labels, holidays } from '~/consts/calendar';
import initial from './const';
import styles from './my-calendars.styles';

const MyCalendars = ({ calendars, setFilter }) => {
  const { values, handleChange } = useFormik({
    initialValues: {
      calendars: initial(calendars),
      holidays: true,
    },
  });

  useEffect(() => {
    setFilter({
      calendars: Object.entries(values.calendars)
        .filter(([_, v]) => v)
        .map(([k]) => k),
      holidays: values.holidays,
    });
  }, [values, setFilter]);

  return (
    <VStack sx={styles.calendars} spacing={4} divider={<StackDivider borderColor="gray.200" />}>
      <Flex sx={styles.subContainer}>
        <Text fontSize="xl">{labels.my}</Text>
        {calendars.map((c) => (
          <Checkbox
            name={`calendars.${c.id}`}
            value={values.calendars[c.id]}
            key={c.id}
            spacing="1rem"
            size="lg"
            defaultChecked={values.calendars[c.id]}
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
          name="holidays"
          value={values.holidays}
          spacing="1rem"
          size="lg"
          defaultChecked={values.holidays}
          sx={styles.checkbox}
          colorScheme="green"
          onChange={handleChange}
        >
          {holidays.name}
        </Checkbox>
      </Flex>
    </VStack>
  );
};

export default MyCalendars;
