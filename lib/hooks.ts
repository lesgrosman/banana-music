import useSWR from "swr";
import { Playlist, User } from "@prisma/client";
import fetcher from "./fetcher";

interface UsePlaylists {
  playlists: Playlist[];
  loading: boolean;
  error?: string;
}

interface UseMe {
  user: User & {
    playlistCount: number;
  };
  loading: boolean;
  error?: string;
}

export const useMe = (): UseMe => {
  const { data, error } = useSWR<User & { playlistCount: number }, string>(
    "/me",
    fetcher
  );

  return {
    user: data,
    loading: !data && !error,
    error,
  };
};

export const usePlaylists = (): UsePlaylists => {
  const { data, error } = useSWR<Playlist[], string>("/playlist", fetcher);

  return {
    playlists: data || [],
    loading: !data && !error,
    error: error && "Something went wrong",
  };
};
