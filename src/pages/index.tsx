import { Box, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { intervalToDuration } from 'date-fns';

import photo from 'public/photo.jpeg';

const endDate = new Date(Date.parse('26 May 2022 19:00:00'));

const getIntervalToDuration = () =>
  intervalToDuration({
    start: new Date(),
    end: endDate,
  });

const colours = ['red', 'blue', 'orange', 'green'];

export default function Home(): JSX.Element {
  const [intervalToDur, setIntervalToDur] = useState(getIntervalToDuration());

  const [clickCount, setClickCount] = useState(0);

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

  const onClick = () => {
    setClickCount(clickCount + 1);
  };

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
        {clickCount < 10 ? (
          <button onClick={onClick}>
            <Heading
              color={colours[clickCount % colours.length]}
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
          </button>
        ) : (
          <Image src={photo} />
        )}
      </Box>
    </Flex>
  );
}
