import {
  Avatar,
  Button,
  Card,
  CardBody,
  Container,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";

const App = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [view, setView] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    console.log("submit");
    e.preventDefault();
    result = await axios
      .get(`https://api.github.com/users/${username}`)
      .then((res) => {
        setView(false);
        setUserData(res);
        setError("");
      })
      .catch((err) => {
        setError("User not found");
        setView(true);
      });
  };

var result;

  useEffect(() => {
    if (result) {
      setView(false);
    }
    setView(true);
  }, [result]);

  const handleChange = (event) => setUsername(event.target.value);

  return (
    <Container>
      <VStack h={"100vh"} >
        <form onSubmit={(e) => handleSubmit(e)}>
          <HStack mt={"50"} mb={"55"}>
            <Input
              variant={"filled"}
              value={username}
              size={"md"}
              onChange={handleChange}
              placeholder="Enter Github username"
            />
            <Button type="submit" colorScheme="twitter">
              Search
            </Button>
          </HStack>
        </form>

          <Card maxW="md" bg={"blackAlpha.600"} mt={"44"}>
          {
            error&&
            <Text fontSize={'3xl'} p={'5'}>  
              {error} 
            </Text>
          }
          { view ?(
          <Text fontSize={'3xl'} p={'4'}>  
              Enter User name 
            </Text>

          ):(

            <CardBody w={'70'}>
            <VStack  alignItems={'flex-start'}>
              <HStack justifyContent={'space-around'}>
                <Avatar
                  size={"xl"}
                  name={userData?.data?.name}
                  src={userData?.data?.avatar_url}
                />
                <HStack><Heading size="md">{userData?.data?.name}</Heading></HStack>
              </HStack>
              
              <span>Username:&nbsp;&nbsp;{userData?.data?.login}</span>
              <span>Name:&nbsp;&nbsp;{userData?.data?.name}</span>
              <span>No. of public repos:&nbsp;&nbsp;{userData?.data?.public_repos}</span>
              <span>No. of public gists:&nbsp;&nbsp;{userData?.data?.public_gists}</span>
              <span>Profile created at:</span>
              
              <span>Profile created at:&nbsp;&nbsp;{userData?.data?.created_at}</span>
            </VStack>
          </CardBody>
            
          )
          }

        </Card>
        
      </VStack>
    </Container>
  );
};

export default App;
