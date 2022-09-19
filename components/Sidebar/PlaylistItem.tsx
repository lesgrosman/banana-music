import React from "react";
import NextLink from "next/link";
import { ListItem, LinkOverlay, LinkBox } from "@chakra-ui/layout";
import { Playlist } from "@prisma/client";

interface Props {
  playlist: Playlist;
}

const PlaylistItem = ({ playlist }: Props) => {
  return (
    <ListItem fontSize="16px">
      <LinkBox>
        <NextLink
          href={{ pathname: "/playlist/[id]", query: { id: playlist.id } }}
          passHref
        >
          <LinkOverlay>{playlist?.name}</LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  );
};

export default PlaylistItem;
