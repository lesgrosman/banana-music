import React from "react";
import NextImage from "next/image";
import { Box, List, Divider } from "@chakra-ui/layout";
import CustomListItem from "./CustomListItem";
import { navItems, musicItems, playlists } from "./constants";
import PlaylistItem from "./PlaylistItem";

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      paddingX="5px"
      bg="black"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/logo.svg" width={60} height={40} />
        </Box>

        <Box marginBottom="40px" paddingX="20px">
          <List spacing={2}>
            {navItems.map((item) => (
              <CustomListItem key={item.id} item={item} />
            ))}
          </List>
        </Box>

        <Box paddingX="20px" marginBottom="20px">
          <List spacing={2}>
            {musicItems.map((item) => (
              <CustomListItem key={item.id} item={item} />
            ))}
          </List>
        </Box>

        <Box paddingX="20px">
          <Divider color="gray.800" />
        </Box>

        <Box marginTop="20px" paddingX="20px" overflowY="auto" height="56%">
          <List spacing={2}>
            {playlists.map((item) => (
              <PlaylistItem key={item} name={item} />
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
