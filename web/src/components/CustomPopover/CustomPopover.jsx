import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';

const CustomPopover = ({ header, trigger, children }) => {
  return (
    <Popover returnFocusOnClose={false} placement="bottom">
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent sx={{ background: 'gray.200' }}>
        <PopoverHeader fontWeight="semibold">{header}</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopover;
