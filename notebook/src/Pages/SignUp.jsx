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

const SignUp = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");

  const SignUpCheck = () => {
    let signupobj = {
      userID: Date.now(),
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      phone: signupPhone,
    };

    axios
      .post(`https://notebook-server-8hzk.onrender.com/users`, signupobj)
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("signupdata", JSON.stringify(res.data));
        sessionStorage.setItem("isAuth", true);
        navigate("/login");
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((e) => {
        console.log("Error:", e);
        toast({
          title: "Something goes wrong",
          description: "We've not create your account",
          status: "failure",
          duration: 5000,
          isClosable: false,
        });
      });
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
              SignUp
            </Text>
            <Input
              w="300px"
              type="text"
              m="10px 5px"
              id="signupname"
              placeholder="Name"
              display={{ base: "none", md: "flex" }}
              border="1px solid teal"
              onChange={(e) => setSignupName(e.target.value)}
            />
            <Input
              type="email"
              m="10px 5px"
              id="signupemail"
              placeholder="Email"
              display={{ base: "none", md: "flex" }}
              border="1px solid teal"
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <Input
              m="10px 5px"
              type="password"
              id="signuppassword"
              placeholder="Password"
              display={{ base: "none", md: "flex" }}
              border="1px solid teal"
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <Input
              m="10px 5px"
              type="number"
              id="signupphone"
              placeholder="Phone"
              display={{ base: "none", md: "flex" }}
              border="1px solid teal"
              onChange={(e) => setSignupPhone(e.target.value)}
            />

            <Button
              bg={"teal.400"}
              color={"white"}
              m="5px"
              onClick={() => SignUpCheck()}
            >
              SignUp
            </Button>
          </Box>
        </Flex>
      </FormControl>
    </div>
  );
};

export default SignUp;
