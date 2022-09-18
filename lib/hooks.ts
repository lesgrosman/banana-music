import useSWR from "swr";
import fetcher from "./fetcher";
import { Playlist } from "../utils/types";

interface UsePlaylists {
  playlists: Playlist[];
  loading: boolean;
  error?: string;
}

export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);

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
