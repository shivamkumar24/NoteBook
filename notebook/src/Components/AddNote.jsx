import {
  Box,
  Input,
  Button,
  Textarea,
  useToast,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import React, { useReducer } from "react";
import { addNotes, getNotes } from "../Redux/actions";
import { useDispatch, useSelector } from "react-redux";

let logindata = JSON.parse(sessionStorage.getItem("logindata"));
let userid;

if (logindata) {
  userid = logindata.userID;
}

const initialState = {
  title: "",
  description: "",
  userID: userid,
};

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "description":
      return { ...state, description: action.payload };
    case "userID":
      return { ...state, userID: action.payload };
    default:
      return state;
  }
};

const AddNote = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const noteData = useSelector((store) => store.notes);
  const [productState, setProductState] = useReducer(
    reducerFunction,
    initialState
  );

  const addNoteHandler = () => {
    if (logindata) {
      setProductState({ type: "userID", payload: userid });
      if (noteData.length && noteData.length >= 0) {
        let notThere = true;
        for (let i = 0; i < noteData.length; i++) {
          if (noteData[i].title === productState.title) {
            notThere = false;
            break;
          }
        }

        if (notThere) {
          dispatch(addNotes(productState)).then((re) => {
            dispatch(getNotes);
            toast({
              title: "Added Successfully",
              description: "Your new note is added now.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          });
        } else {
          toast({
            title: "Not valid note",
            description: "Note Already Exists",
            status: "info",
            duration: 2000,
            isClosable: true,
          });
        }
      }

      if (noteData.length === 0) {
        let arr = [productState];
        dispatch(addNotes(arr)).then((re) => {
          dispatch(getNotes);
          toast({
            title: "Added Successfully",
            description: "Your new note is added now.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        });
      }
    } else {
      toast({
        title: "Not LoggedIn",
        description: "Please login first",
        status: "info",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <FormControl
      width={{ base: "80%", md: "50%", lg: "50%" }}
      style={{
        margin: "auto",
        padding: "20px",
        marginTop: "20px",
        border: "1px solid black",
        borderRadius: "15px",
      }}
    >
      {/* Input Title */}
      <Box>
        <FormLabel
          style={{ fontSize: "15px", fontWeight: "bold", padding: "5px" }}
        >
          Title:
        </FormLabel>
        <Input
          type="text"
          padding="2px 7px"
          fontWeight="medium"
          placeholder="Add Title ...."
          onChange={(e) =>
            setProductState({ type: "title", payload: e.target.value })
          }
        />
      </Box>

      {/* Input description */}
      <Box>
        <FormLabel
          style={{ fontSize: "15px", fontWeight: "bold", padding: "5px" }}
        >
          Description:
        </FormLabel>
        <Textarea
          size="sm"
          fontSize="15px"
          fontWeight="medium"
          placeholder="Add Description ...."
          onChange={(e) =>
            setProductState({ type: "description", payload: e.target.value })
          }
        />
      </Box>

      {/* Button */}
      <Button
        style={{
          fontWeight: "bold",
          padding: "4px 8px",
          marginTop: "15px",
          borderRadius: "12px",
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
        colorScheme="teal"
        variant="outline"
        onClick={addNoteHandler}
      >
        Add Note
      </Button>
    </FormControl>
  );
};

export default AddNote;
