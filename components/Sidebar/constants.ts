import {
  MdSearch,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import { ListItemType } from "./types";

export const navItems: ListItemType[] = [
  {
    id: "01",
    label: "Home",
    route: "/",
    icon: MdHome,
  },
  {
    id: "02",
    label: "Search",
    route: "/search",
    icon: MdSearch,
  },
  {
    id: "03",
    label: "Your Library",
    route: "/library",
    icon: MdLibraryMusic,
  },
];

export const musicItems = [
  {
    id: "01",
    label: "Create Playlist",
    route: "/",
    icon: MdPlaylistAdd,
  },
  {
    id: "02",
    label: "Favorites",
    route: "/favorites",
    icon: MdFavorite,
  },
];

export const playlists: string[] = new Array(30)
  .fill(1)
  .map((_, i) => `Playlist #${i + 1}`);
