import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import CreateEventTabs from '~/components/Tabs/CreateEventTabs';
import styles from './createEvent.styles';

const CreateEvent = () => {
  return (
    <Box sx={styles.wrapper}>
      <Flex sx={styles.header}>
        <Button
          leftIcon={<ArrowBackIcon boxSize={5} />}
          as={RouterLink}
          to=".."
          colorScheme="green"
          variant="ghost"
          size="lg"
        >
          Back
        </Button>

        <Heading as="h1" size="lg" sx={styles.heading}>
          Create an event
        </Heading>
      </Flex>
      <Flex sx={styles.content}>
        <Box sx={styles.container}>
          <CreateEventTabs />
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateEvent;
