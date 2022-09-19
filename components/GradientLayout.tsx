import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

interface Props {
  title: React.ReactNode;
  label: React.ReactNode;
  image: string;
  description: React.ReactNode;
  children: React.ReactNode;
  color: string;
  roundImage?: boolean;
}

const GradientLayout = ({
  title,
  label,
  image,
  description,
  children,
  color,
  roundImage,
}: Props) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.900 0%, ${color}.600 15%, ${color}.700 40%, rgba(0, 0, 0, 0.95) 75%)`}
    >
      <Flex bg={`${color}.500`} padding="40px" align="end">
        <Image
          src={image}
          border="none"
          boxSize="180px"
          boxShadow="2xl"
          borderRadius={roundImage ? "100%" : "3px"}
        />
        <Box color="white" padding="20px">
          <Text fontSize="x-small" casing="uppercase">
            {label}
          </Text>
          <Text fontSize="6xl" fontWeight="extrabold">
            {title}
          </Text>
          <Text fontSize="x-small">{description}</Text>
        </Box>
      </Flex>
      <Box padding="40px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
