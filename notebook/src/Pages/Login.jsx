import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  useToast,
  FormControl,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const LoginCheck = async () => {
    let res = await axios.get(
      `https://notebook-server-8hzk.onrender.com/users`
    );
    let data = await res.data;
    // console.log(data);

    let notFound = true;
    for (let i = 0; i < data.length; i++) {
      if (data[i].email === loginEmail && data[i].password && loginPassword) {
        sessionStorage.setItem("logindata", JSON.stringify(data[i]));
        sessionStorage.setItem("isAuth", true);
        navigate("/");
        toast({
          title: "Successfully Login",
          description: "Welcome to Note-Book",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        notFound = false;
      }
    }
    if (notFound) {
      toast({
        title: "Invalid Credentials",
        description: "Your data is not matched to our record",
        status: "failure",
        duration: 5000,
        isClosable: false,
      });
    }
  };

  return (
    <Box
      width={{ base: "90%", md: "40%" }}
      height={"auto"}
      margin="auto"
      marginTop={{ base: "40px", md: "100px" }}
      alignContent="center"
      borderRadius="18px"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
    >
      <FormControl bg="#f6f5f4" p={{ base: "14px", md: "20px" }}>
        <Flex>
          <Box m="auto" h="auto">
            <Text
              m="5px"
              fontWeight="bold"
              textAlign="center"
              fontSize={{ base: "22px", md: "32px" }}
            >
              Login
            </Text>
            <Input
              w={{ base: "300px", md: "400px" }}
              m={{ base: "8px auto", md: "10px 5px" }}
              id="loginemail"
              type="email"
              placeholder="Email"
              display={{ base: "none", md: "flex" }}
              border="1px solid teal"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              w={{ base: "300px", md: "400px" }}
              m={{ base: "8px auto", md: "10px 5px" }}
              id="loginpassword"
              type="password"
              placeholder="Password"
              display={{ base: "none", md: "flex" }}
              border="1px solid teal"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button
              bg={"teal.400"}
              color={"white"}
              m={{ base: "2px", md: "5px" }}
              onClick={LoginCheck}
            >
              Login
            </Button>
          </Box>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Login;
