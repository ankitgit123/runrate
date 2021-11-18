export const setContact = (contactData) => ({
  type: "SET_CONTACT",
  payload: contactData,
});

export const removeContact = (contactId) => ({
  type: "REMOVE_CONTACT",
  payload: contactId,
});

export const fetchContacts = () => ({
  type: "FETCH_CONTACTS",
});
