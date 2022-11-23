import {
  PopoverBody,
  Button,
  Flex,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';

const ConfirmPopover = ({ header, trigger, isOpen, onClose, onConfirm }) => {
  const confirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Popover returnFocusOnClose={false} placement="bottom" isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent sx={{ borderColor: 'red.400' }}>
        <PopoverHeader fontWeight="semibold">{header}</PopoverHeader>
        <PopoverBody>
          <Flex sx={{ width: '100%', justifyContent: 'space-around' }}>
            <Button onClick={onClose} colorScheme="red" variant="outline">
              Cancel
            </Button>
            <Button onClick={confirm} colorScheme="green">
              Confirm
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ConfirmPopover;
