import { Checkbox, Flex, StackDivider, Text, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { CALENDAR_SECTIONS, CALENDAR_FILTER } from '~/consts/calendar';
import { initialCalendars, initialTypes } from './const';
import styles from './my-calendars.styles';

const MyCalendars = ({ calendars, setFilter }) => {
  const { values, handleChange } = useFormik({
    initialValues: {
      calendars: initialCalendars(calendars),
      holidays: true,
      types: initialTypes,
    },
  });

  useEffect(() => {
    setFilter({
      calendars: Object.entries(values.calendars)
        .filter(([_, v]) => v)
        .map(([k]) => k),
      holidays: values.holidays,
      types: Object.entries(values.types)
        .filter(([_, v]) => v)
        .map(([k]) => k),
    });
  }, [values, setFilter]);

  return (
    <VStack sx={styles.calendars} spacing={4} divider={<StackDivider borderColor="gray.200" />}>
      <Flex sx={styles.subContainer}>
        <Text fontSize="xl">{CALENDAR_SECTIONS.my}</Text>
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
        <Text fontSize="xl">{CALENDAR_SECTIONS.other}</Text>
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
          {CALENDAR_FILTER.holidays}
        </Checkbox>
      </Flex>
      <Flex sx={styles.subContainer}>
        <Text fontSize="xl">{CALENDAR_SECTIONS.types}</Text>
        {CALENDAR_FILTER.types.map((t) => (
          <Checkbox
            name={`types.${t.id}`}
            value={values.types[t.id]}
            key={t.id}
            spacing="1rem"
            size="lg"
            defaultChecked={values.types[t.id]}
            sx={styles.checkbox}
            colorScheme="green"
            onChange={handleChange}
          >
            {t.name}
          </Checkbox>
        ))}
      </Flex>
    </VStack>
  );
};

export default MyCalendars;
