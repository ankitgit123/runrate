const isEmpty = require("is-empty");

let initialState = {
  contacts: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CONTACT":
      const newState = [...state.contacts, action.payload];
      return newState;
    case "FETCH_CONTACTS":
      return {
        ...state,
      };
    case "DELETE_CONTACT":
      const filteredData = state.contacts.filter(({id}) => id !== action.id)
      return {
        filteredData,
      };
    default:
      return state;
  }
};
export default userReducer;
