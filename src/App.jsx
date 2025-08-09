import React, { useState } from "react";
import { ContactProvider } from "./context/ContactContext";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import "./App.css";

export default function App() {
  const [selectedContact, setSelectedContact] = useState(null);

  const clearSelection = () => setSelectedContact(null);

  return (
    <ContactProvider>
      <div className="app-container">
        <AddContact
          selectedContact={selectedContact}
          clearSelection={clearSelection}
        />
        <ContactList onEdit={setSelectedContact} />
      </div>
    </ContactProvider>
  );
}
