import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import GradientLayout from "../components/GradientLayout";
import prisma from "../lib/prisma";

const Home = ({ artists }: { artists: Artist[] }) => {
  return (
    <GradientLayout
      color="purple"
      title="Jack Ass"
      description="15 playlists"
      label="profile"
      image="/snoop.jpeg"
      roundImage
    >
      <Box>
        <Box marginBottom="15px ">
          <Text color="white" fontSize="2xl" fontWeight="bold">
            Top artists of this month
          </Text>
          <Text color="gray.500" fontSize="small">
            Only visible for you
          </Text>
        </Box>
        <Flex gap="30px">
          {artists.map((artist) => (
            <Box
              key={artist.id}
              bg="gray.900"
              borderRadius="5px"
              padding="15px"
            >
              <Image
                src="/snoop.jpeg"
                border="none"
                boxSize="140px"
                boxShadow="lg"
                borderRadius="100%"
                marginBottom="10px"
              />
              <Box color="white">
                <Text fontSize="lg" fontWeight="bold">
                  {artist.name}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  Artist
                </Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: {
      artists,
    },
  };
};

export default Home;
