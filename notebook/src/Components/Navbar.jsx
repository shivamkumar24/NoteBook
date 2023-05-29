import {
  Box,
  Img,
  Text,
  Flex,
  Button,
  Avatar,
  Heading,
  Popover,
  PopoverBody,
  PopoverArrow,
  PopoverHeader,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
  PopoverCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { getNotes } from "../Redux/actions";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isAuth = JSON.parse(sessionStorage.getItem("isAuth")) || false;
  let logindata = JSON.parse(sessionStorage.getItem("logindata"));

  const handleLogout = () => {
    sessionStorage.setItem("isAuth", false);
    sessionStorage.clear();
    dispatch(getNotes);
    navigate("/");
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Img
            h="50px"
            width="100px"
            src="Logo.png"
            alt="logo"
            onClick={() => navigate("/")}
          />

          <Heading>Note-Book</Heading>

          <Flex alignItems={"center"}>
            {isAuth && logindata !== null ? (
              <Popover placement="left">
                <PopoverTrigger>
                  <BsPersonCircle
                    style={{
                      height: "30px",
                      width: "30px",
                      marginRight: " 45px",
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent marginLeft="350%">
                  <PopoverHeader fontWeight="semibold" bg="teal.500">
                    <Flex>
                      <Avatar
                        bg={"white"}
                        color={"teal"}
                        size="md"
                        margin="2px 5px"
                        name={`${logindata.name}`}
                      />
                      <Heading
                        color="white"
                        as="h3"
                        size="lg"
                        mt="5px"
                        ml="5px"
                        textAlign={"center"}
                      >
                        Hi , {logindata.name}
                      </Heading>
                    </Flex>
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton color="white" />
                  <PopoverBody>
                    <Text
                      textAlign={"center"}
                      onClick={handleLogout}
                      cursor={"pointer"}
                      color={"orange.400"}
                    >
                      Logout
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ) : (
              <Flex>
                <Button
                  bg="green.400"
                  color="whitesmoke"
                  margin="2px 7px"
                  fontWeight="bold"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  bg="green.400"
                  color="whitesmoke"
                  margin="2px 7px"
                  fontWeight="bold"
                  onClick={() => navigate("/signup")}
                >
                  SignUp
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
