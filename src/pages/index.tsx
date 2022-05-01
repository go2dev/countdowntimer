import { Box, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { intervalToDuration } from 'date-fns';

import photo from 'public/photo.jpeg';
import photo2 from 'public/photo2.jpeg';
import photo3 from 'public/photo3.jpeg';

const endDate = new Date(Date.parse('26 May 2022 19:00:00'));

const getIntervalToDuration = () =>
  intervalToDuration({
    start: new Date(),
    end: endDate,
  });

const pad = (n: number | undefined): string => {
  if (!n) return '';

  return n < 10 ? `0${n}` : n.toString();
};

const colours = ['red', 'blue', 'orange', 'yellow'];

export default function Home(): JSX.Element {
  const [intervalToDur, setIntervalToDur] = useState(getIntervalToDuration());

  const [clickCount, setClickCount] = useState(0);

  const [countDown, setCountDown] = useState(
    endDate.getTime() - new Date().getTime()
  );

  useEffect(() => {
    console.log('Soon.');

    const interval = setInterval(() => {
      setIntervalToDur(getIntervalToDuration());

      const value = endDate.getTime() - new Date().getTime();
      setCountDown(value);
    }, 11);

    return () => clearInterval(interval);
  }, []);

  const onClick = () => {
    if (clickCount === 12) {
      setClickCount(0);
    } else {
      setClickCount(clickCount + 1);
    }
  };

  const { days, hours, minutes, seconds } = intervalToDur;

  const milliseconds = countDown
    .toString()
    .slice(countDown.toString().length - 3, countDown.toString().length);

  let photoToShow = photo;
  if (clickCount === 12) {
    photoToShow = photo3;
  } else if (clickCount === 11) {
    photoToShow = photo2;
  }

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
        <button onClick={onClick}>
          {clickCount < 10 ? (
            <Heading
              color={colours[clickCount % colours.length]}
              fontSize={{ base: '2xl', md: '5xl', lg: '8xl', xl: '16xl' }}
            >
              {`${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(
                seconds
              )}:${milliseconds}`}
            </Heading>
          ) : (
            <Image src={photoToShow} />
          )}
        </button>
      </Box>
    </Flex>
  );
}
