import { Playlist as PlaylistType, Song } from "@prisma/client";
import GradientLayout from "../../components/GradientLayout";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import SongTable from "../../components/SongTable";

const getBGColor = (id) => {
  const colors = [
    "red",
    "green",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
    "blue",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

interface ServerSideProps {
  playlist: PlaylistType & {
    songs: Song[];
  };
}

const Playlist = ({ playlist }: ServerSideProps) => {
  const color = getBGColor(playlist.id);
  return (
    <GradientLayout
      color={color}
      label="playlist"
      title={playlist.name}
      description={`${playlist?.songs?.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }) => {
  let user;

  try {
    user = validateToken(req.cookies.BANANA_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        path: "/signin",
      },
    };
  }
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });

  return {
    props: {
      playlist,
    },
  };
};

export default Playlist;
