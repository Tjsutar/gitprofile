import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsGithub } from "react-icons/bs";
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
        console.log(res);
        // console.log(user.data.events_url);
      })
      .catch((err) => {
        setError("User not found");
        console.log(err);
      });
  };

console.log(userData?.data?.html_url);
console.log(userData?.data?.created_at);

// let date=userData?.data?.created_at;
//  let time=date.split("T");
//  console.log(time[0] + time[1]);

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
            userData?.data?.id &&
            <Text fontSize={'3xl'} p={'5'}>  
              {error} 
            </Text>
          }
          { view ?(
          <Text fontSize={'3xl'} p={'5'}>  
              Enter User name 
            </Text>

          ):(

            <CardBody w={'60'}>
            <VStack  alignItems={'flex-start'}>
              <HStack justifyContent={'space-around'}>
                <Avatar
                  size={"xl"}
                  name={userData?.data?.name}
                  src={userData?.data?.avatar_url}
                />
                <HStack></HStack>
              </HStack>
              
              {/* <Heading size="md">{userData?.data?.name}</Heading> */}
              <span>
                No. of public repos:&nbsp;&nbsp;{userData?.data?.public_repos}
              </span>
              <span>
                No. of public gists:&nbsp;&nbsp;{userData?.data?.public_gists}
              </span>
              <span>Profile created at:</span>
              
           <span>Profile created at:&nbsp;&nbsp;{userData?.data?.created_at}</span>
              {/* <span>
                Date : {time[0]}
              </span>
              <span>
                Time : {time[1]}
              </span> */}
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
