import create from "zustand";
import { SongType } from "../utils/types";

export type StoreModel = {
  activeSong: SongType | null;
  activeSongs: SongType[];
  changeActiveSongs: (songs: SongType[]) => void;
  changeActiveSong: (song: SongType) => void;
};

export const useStore = create<StoreModel>((set) => ({
  activeSong: null,
  activeSongs: [],
  changeActiveSong: (song) =>
    set({
      activeSong: song,
    }),
  changeActiveSongs: (songs) =>
    set({
      activeSongs: songs,
    }),
}));
