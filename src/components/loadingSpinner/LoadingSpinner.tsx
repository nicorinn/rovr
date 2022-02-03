import { Flex, Spinner } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  minHeight?: number;
  minWidth?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  minHeight,
  minWidth,
}) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight || 0}
      minWidth={minWidth || 0}
      width="100%"
    >
      <Spinner size="xl" color="red.200" />
    </Flex>
  );
};

export default LoadingSpinner;
