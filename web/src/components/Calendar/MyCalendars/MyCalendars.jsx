import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  Flex,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import CreateCalendarModal from '~/components/Modal/CreateCalendarModal';
import { CALENDAR_SECTIONS, CALENDAR_FILTER } from '~/consts/calendar';
import CalendarItem from '../CalendarItem/CalendarItem';
import { initialCalendars, initialTypes } from './const';
import styles from './my-calendars.styles';

const MyCalendars = ({ calendars, setFilter }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { values, handleChange, setFieldValue } = useFormik({
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
        <Flex sx={styles.newCalendar}>
          <Text fontSize="xl">{CALENDAR_SECTIONS.my}</Text>
          <Button
            onClick={onOpen}
            size="sm"
            variant="outline"
            colorScheme="green"
            leftIcon={<AddIcon />}
          >
            New
          </Button>
        </Flex>
        {calendars.map((c) => (
          <CalendarItem
            key={c.id}
            calendar={c}
            formik={{
              handleChange,
              setFieldValue,
              values,
            }}
          />
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
      <CreateCalendarModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default MyCalendars;
