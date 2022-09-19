import React, { useState, useEffect, useRef } from "react";
import ReactHowler from "react-howler";
import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import {
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { formatTime } from "../../lib/formatter";
import { StoreModel, useStore } from "../../lib/useStore";
import { SongType } from "../../utils/types";

const selectorChangeActiveSong = (s: StoreModel) => s.changeActiveSong;

interface Props {
  songs: SongType[];
  activeSong: SongType;
}

const Controls = ({ songs, activeSong }: Props) => {
  const [playing, setPlaying] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seek, setSeek] = useState<number>(0.0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0.0);

  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);

  const changeActiveSong = useStore(selectorChangeActiveSong);

  useEffect(() => {
    let timerId;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    changeActiveSong(songs[index]);
  }, [changeActiveSong, index, songs]);

  useEffect(() => {
    if (repeatRef.current) {
      repeatRef.current = repeat;
    }
  }, [repeat]);

  const setPlayState = (value: boolean) => {
    setPlaying(value);
  };

  const setShuffleState = () => {
    setShuffle((previous) => !previous);
  };

  const setRepeatState = () => {
    setRepeat((previous) => !previous);
  };

  const nextSong = () => {
    if (shuffle) {
      const next = Math.floor(Math.random() * songs.length);
      if (next === index) {
        nextSong();
      } else {
        setIndex(next);
      }
    } else {
      setIndex((state) => (state === songs.length - 1 ? 0 : state + 1));
    }
  };

  const prevSong = () => {
    setIndex((state) => (state ? state - 1 : songs.length - 1));
  };

  const onEnd = () => {
    if (repeatRef.current) {
      if (soundRef.current) {
        setSeek(0);
        soundRef.current.seek(0);
      }
    } else {
      nextSong();
    }
  };

  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e) => {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          ref={soundRef}
          playing={playing}
          src={activeSong?.url}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            aria-label="suffle"
            fontSize="24px"
            outline="none"
            variant="link"
            color={shuffle ? "white" : "gray.600"}
            icon={<MdShuffle />}
            onClick={setShuffleState}
          />
          <IconButton
            aria-label="previous"
            fontSize="24px"
            outline="none"
            variant="link"
            color="gray.600"
            sx={{
              "&:hover": {
                color: "white",
              },
            }}
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {playing ? (
            <IconButton
              aria-label="pause"
              fontSize="40px"
              outline="none"
              variant="link"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              aria-label="play"
              fontSize="40px"
              outline="none"
              variant="link"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}
          <IconButton
            aria-label="next"
            fontSize="24px"
            outline="none"
            variant="link"
            color="gray.600"
            sx={{
              "&:hover": {
                color: "white",
              },
            }}
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            aria-label="repeat"
            fontSize="24px"
            outline="none"
            variant="link"
            color={repeat ? "white" : "gray.600"}
            icon={<MdOutlineRepeat />}
            onClick={setRepeatState}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" alignItems="center" gap="10px">
          <Box width="10%" textAlign="start">
            <Text fontSize="x-small">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              id="player-range"
              /* eslint-disable-next-line jsx-a11y/aria-proptypes */
              aria-label={["main", "max"]}
              step={0.1}
              min={0}
              max={duration ? +duration.toFixed(2) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="end">
            <Text fontSize="x-small">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Controls;
