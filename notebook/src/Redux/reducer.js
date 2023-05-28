import * as types from "./actionTypes";

const initialState = {
  notes: [],
  isLoading: false,
  isError: false,
};

const reducer = (oldState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // get
    case types.GET_NOTE_REQUEST:
      return { ...oldState, isLoading: true };
    case types.GET_NOTE_SUCCESS:
      return { ...oldState, isLoading: false, notes: payload };
    case types.GET_NOTE_FAILURE:
      return { ...oldState, isLoading: false, isError: true };

    // post
    case types.ADD_NOTE_REQUEST:
      return { ...oldState, isLoading: true };
    case types.ADD_NOTE_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        notes: [...oldState.notes, payload],
      };
    case types.ADD_NOTE_FAILURE:
      return { ...oldState, isLoading: false, isError: true };

    // patch
    case types.EDIT_NOTE_REQUEST:
      return { ...oldState, isLoading: true };
    case types.EDIT_NOTE_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        notes: oldState.notes.map((item) =>
          item.id === payload.id ? payload : item
        ),
      };
    case types.EDIT_NOTE_FAILURE:
      return { ...oldState, isLoading: false, isError: false };

    // delete
    case types.DELETE_NOTE_REQUEST:
      return { ...oldState, isLoading: true };
    case types.DELETE_NOTE_SUCCESS:
      return {
        ...oldState,
        isLoading: false,
        notes: oldState.notes.filter((note) => note.id !== payload),
      };
    case types.DELETE_NOTE_FAILURE:
      return { ...oldState, isLoading: false, isError: true };

    default:
      return oldState;
  }
};

export default reducer;
