import React from "react";
import NextLink from "next/link";
import { ListItem, ListIcon, LinkOverlay, LinkBox } from "@chakra-ui/layout";
import { ListItemType } from "./types";

interface Props {
  item: ListItemType;
}

const CustomListItem = ({ item }: Props) => {
  return (
    <ListItem fontSize="16px">
      <LinkBox>
        <NextLink href={item.route} passHref>
          <LinkOverlay>
            <ListIcon as={item.icon} color="white" marginRight="20px" />
            {item.label}
          </LinkOverlay>
        </NextLink>
      </LinkBox>
    </ListItem>
  );
};

export default CustomListItem;
