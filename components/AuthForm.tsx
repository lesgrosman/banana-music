import React, { useState } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import NextImage from "next/image";
import { useRouter } from "next/router";
import { auth } from "../lib/mutations";

interface Props {
  mode: "signin" | "signup";
}

const AuthForm = ({ mode }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await auth(mode, { email, password });

    if (res.error) {
      setError(res.error);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      router.push("/");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <Box bg="black" color="white" height="100vh" width="100vw">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="1px solid white"
      >
        <NextImage src="/logo.svg" width="100px" height="50px" />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box bg="gray.900" padding="50px" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              marginBottom="20px"
              value={email}
            />
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              marginBottom="20px"
              value={password}
            />
            <Flex justify="end">
              <Button
                type="submit"
                bg="green.400"
                sx={{
                  "&:hover": {
                    bg: "green.300",
                  },
                }}
                isLoading={isLoading}
              >
                {mode}
              </Button>
            </Flex>
            {error && (
              <Flex justify="end" color="red.400" marginTop="20px">
                {error}
              </Flex>
            )}
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
