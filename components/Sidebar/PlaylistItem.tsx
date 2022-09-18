import React from "react";
import NextLink from "next/link";
import { ListItem, LinkOverlay, LinkBox } from "@chakra-ui/layout";

const PlaylistItem = ({ name }: { name: string }) => {
  return (
    <ListItem fontSize="16px">
      <LinkBox>
        <NextLink href="/" passHref>
          <LinkOverlay>{name}</LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  );
};

export default PlaylistItem;
