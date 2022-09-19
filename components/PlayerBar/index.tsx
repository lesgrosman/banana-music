import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import Controls from "./Controls";
import { StoreModel, useStore } from "../../lib/useStore";

const selectSongs = (s: StoreModel) => s.activeSongs;
const selectActiveSong = (s: StoreModel) => s.activeSong;

const PlayerBar = () => {
  const songs = useStore(selectSongs);
  const activeSong = useStore(selectActiveSong);

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex justify="space-between" alignItems="center" padding="5px">
        <Flex color="white" alignItems="center" gap="10px" width="25%">
          {activeSong && (
            <>
              <Image
                src={`https://picsum.photos/400?random=${2}`}
                boxSize="75px"
              />
              <Box>
                <Text>{activeSong.name}</Text>
                <Text fontSize="x-small" color="gray.500">
                  {activeSong.artist.name}
                </Text>
              </Box>
            </>
          )}
        </Flex>
        <Box width="50%">
          {activeSong && <Controls songs={songs} activeSong={activeSong} />}
        </Box>
        <Box width="25%">Right side</Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
