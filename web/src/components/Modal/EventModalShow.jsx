import { Text, VStack } from '@chakra-ui/react';
import moment from 'moment';

const EventModalShow = ({ eventInfo }) => {
  const title = eventInfo.event?._def.title;
  const content = eventInfo.event?._def.extendedProps.content;
  const start = eventInfo.event?.start;
  const end = eventInfo.event?.end;
  const color = eventInfo.event?.backgroundColor;
  const type = eventInfo.event?._def.extendedProps.type;

  let infoToShow;

  if (type === 'holiday') {
    infoToShow = [
      { label: 'Title:', value: title },
      { label: 'Description:', value: content },
      { label: 'Start at:', value: moment(start).format('LL') },
      { label: 'Type:', value: type },
    ];
  } else {
    infoToShow = [
      { label: 'Title:', value: title },
      { label: 'Description:', value: content },
      { label: 'Start at:', value: moment(start).format('LLL') },
      { label: 'End at:', value: moment(end).format('LLL') },
      { label: 'Color:', value: color },
      { label: 'Type:', value: type },
    ];
  }

  return (
    <VStack align="start">
      {infoToShow.map((item, index) => {
        if (!item.value) {
          return null;
        }

        return (
          <Text key={index}>
            <Text as="span" fontWeight="bold" mr="5px">
              {item.label}
            </Text>
            {item.value}
          </Text>
        );
      })}
    </VStack>
  );
};

export default EventModalShow;
