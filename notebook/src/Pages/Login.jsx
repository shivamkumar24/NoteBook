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
    let res = await axios.get(`http://localhost:8080/users`);
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
    <div
      style={{
        width: "30%",
        margin: "auto",
        marginTop: "100px",
        alignContent: "center",
        borderRadius: "18px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      <FormControl bg="#f6f5f4" p="20px">
        <Flex>
          <Box dispaly="block" m="auto">
            <Text fontSize="32px" fontWeight="bold" m="5px" textAlign="center">
              Login
            </Text>
            <Input
              w="300px"
              m="10px 5px"
              id="loginemail"
              type="email"
              placeholder="Email"
              display={{ base: "none", md: "flex" }}
              border="1px solid teal"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Input
              m="10px 5px"
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
              m="5px"
              onClick={LoginCheck}
            >
              Login
            </Button>
          </Box>
        </Flex>
      </FormControl>
    </div>
  );
};

export default Login;
