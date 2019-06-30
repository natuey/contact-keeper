import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Nathan Tu',
        email: 'nathan@gmail.com',
        phone: '1800 000 000',
        type: 'personal'
      },
      {
        id: 2,
        name: 'Twee Hoang',
        email: 'twee@gmail.com',
        phone: '99999999',
        type: 'professional'
      },
      {
        id: 3,
        name: 'Mian Ha',
        email: 'mian@gmail.com',
        phone: '444444444',
        type: 'personal'
      }
    ],
    current: null,
    filtered: null
  };

  //   state allows us to access anything in state and dispatch allows us to access objects in reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //   Add Contact
  const addContact = contact => {
    contact.id = uuid.v4(); //generate a random ID by using uuid
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete Contact
  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set current Contact
  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear curent Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update Contact
  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  // Filter Contact
  const filterContacts = text => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filtered: state.filtered,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
