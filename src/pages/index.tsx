import { Box, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { intervalToDuration } from 'date-fns';

const endDate = new Date(Date.parse('26 May 2022 19:00:00'));

const getIntervalToDuration = () =>
  intervalToDuration({
    start: new Date(),
    end: endDate,
  });

export default function Home(): JSX.Element {
  const [intervalToDur, setIntervalToDur] = useState(getIntervalToDuration());

  const [countDown, setCountDown] = useState(
    endDate.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setIntervalToDur(getIntervalToDuration());

      const value = endDate.getTime() - new Date().getTime();
      setCountDown(value);
    }, 11);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      w="full"
      height={200}
      justifyContent="center"
      alignItems="center"
      backgroundColor="black"
      flex={1}
    >
      <Box width={{ base: 'full', md: '750px' }} textAlign={{ base: 'center' }}>
        <Heading
          color="red"
          fontSize={{ base: '2xl', md: '5xl', lg: '8xl', xl: '16xl' }}
        >
          {`${intervalToDur.days}:${intervalToDur.hours}:${intervalToDur.minutes}:${intervalToDur.seconds}:`}
          {countDown
            .toString()
            .slice(
              countDown.toString().length - 3,
              countDown.toString().length
            )}
        </Heading>
      </Box>
    </Flex>
  );
}
