import React, { createContext, useContext, useReducer, useEffect } from "react";

const ContactContext = createContext();

const API_BASE = "https://playground.4geeks.com/contact";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload, loading: false, error: null };
    default:
      return state;
  }
}

export function ContactProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Obtener contactos al cargar
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    dispatch({ type: "LOADING" });
    try {
      const res = await fetch(`${API_BASE}/contact`);
      if (!res.ok) throw new Error("Error al obtener los contactos");
      const data = await res.json();
      dispatch({ type: "SET_CONTACTS", payload: data.results });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  const addContact = async (contact) => {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error("Error al agregar contacto");
      await fetchContacts();
    } catch (error) {
      alert(error.message);
    }
  };

  const updateContact = async (id, contact) => {
    try {
      const res = await fetch(`${API_BASE}/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) throw new Error("Error al actualizar contacto");
      await fetchContacts();
    } catch (error) {
      alert(error.message);
    }
  };

  const deleteContact = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/contact/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar contacto");
      await fetchContacts();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ContactContext.Provider
      value={{
        ...state,
        fetchContacts,
        addContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactContext);
}
