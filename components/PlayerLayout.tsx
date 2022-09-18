import React from "react";
import { Box } from "@chakra-ui/layout";
import Sidebar from "./Sidebar";

interface Props {
  children: React.ReactNode;
}

const PlayerLayout = ({ children }: Props) => {
  return (
    <Box width="100vw" height="100vh">
      <Box position="absolute" left="0" width="250px">
        <Sidebar />
      </Box>
      <Box marginLeft="250px">{children}</Box>
      <Box position="absolute" bottom="0" left="0">
        Player
      </Box>
    </Box>
  );
};

export default PlayerLayout;
