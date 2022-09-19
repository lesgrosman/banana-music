import React from "react";
import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { formatDate, formatTime } from "../../lib/formatter";
import { useStore, StoreModel } from "../../lib/useStore";
import { SongType } from "../../utils/types";

interface Props {
  songs: SongType[];
}

const selectSetActiveSongs = (s: StoreModel) => s.changeActiveSongs;
const selectSetSong = (s: StoreModel) => s.changeActiveSong;

const SongTable = ({ songs }: Props) => {
  const setSongs = useStore(selectSetActiveSongs);
  const setActiveSong = useStore(selectSetSong);

  const handlePlay = (activeSong?: SongType) => {
    setActiveSong(activeSong || songs[0]);
    setSongs(songs);
  };

  return (
    <Box bg="transparent" color="white">
      <Box marginBottom="20px" padding="10px">
        <IconButton
          aria-label="play"
          icon={<BsFillPlayFill fontSize="30px" />}
          colorScheme="green"
          size="lg"
          isRound
          onClick={() => handlePlay()}
        />
      </Box>
      <Table variant="unstyled">
        <Thead borderBottom="1px solid rgb(255, 255, 255, 0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date added</Th>
            <Th>
              <AiOutlineClockCircle />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {songs.map((song, i) => (
            <Tr
              key={song.id}
              sx={{
                transition: "all .3s",
                "&:hover": {
                  bg: "rgb(255, 255, 255, 0.1)",
                },
                cursor: "pointer",
              }}
              onClick={() => handlePlay(song)}
            >
              <Td>{i + 1}</Td>
              <Td>{song?.name}</Td>
              <Td>{formatDate(song.createdAt)}</Td>
              <Td>{formatTime(song.duration)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongTable;
