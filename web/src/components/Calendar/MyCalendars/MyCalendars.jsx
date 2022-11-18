import { Checkbox, Flex, StackDivider, Text, VStack } from "@chakra-ui/react";
import { CALENDAR_LABELS as labels, holidays } from "~/consts/calendar";
import styles from "./my-calendars.styles";

const MyCalendars = () => {
  const calendars = [
    { name: "Main Calendar", hidden: false },
    { name: "Test Calendar", hidden: true },
    { name: "Personal Events", hidden: false },
    { name: "Some Old Tasks", hidden: true },
  ];

  return (
    <VStack
      sx={styles.calendars}
      spacing={4}
      divider={<StackDivider borderColor="gray.200" />}
    >
      <Flex sx={styles.subContainer}>
        <Text fontSize="xl">{labels.my}</Text>
        {calendars.map((c) => (
          <Checkbox
            key={c.name}
            spacing="1rem"
            size="lg"
            defaultChecked={!c.hidden}
            sx={styles.checkbox}
            colorScheme="yellow"
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
