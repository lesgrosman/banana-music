import React from "react";
import { Box } from "@chakra-ui/layout";
import Sidebar from "./Sidebar";
import PlayerBar from "./PlayerBar";

interface Props {
  children: React.ReactNode;
}

const PlayerLayout = ({ children }: Props) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" left="0" width="250px">
        <Sidebar />
      </Box>
      <Box marginLeft="250px">
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="absolute" bottom="0" left="0">
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
