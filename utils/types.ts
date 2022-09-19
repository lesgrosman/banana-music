import { Artist, Song } from "@prisma/client";

export type Playlist = {
  id: number;
  userId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SongType = Song & {
  artist: Artist;
};
