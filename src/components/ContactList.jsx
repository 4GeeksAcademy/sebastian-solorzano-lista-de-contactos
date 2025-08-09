import React, { useState } from "react";
import { useContacts } from "../context/ContactContext";
import ContactCard from "./ContactCard";
import "./ContactList.css";

export default function ContactList({ onEdit }) {
  const { contacts, deleteContact } = useContacts();
  const [showModal, setShowModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  const confirmDelete = (contact) => {
    setToDelete(contact);
    setShowModal(true);
  };

  const handleDelete = () => {
    deleteContact(toDelete.id);
    setShowModal(false);
    setToDelete(null);
  };

  return (
    <>
      {contacts.length === 0 && <p className="contact-list-empty">No hay contactos para mostrar</p>}
      {contacts.map((c) => (
        <ContactCard
          key={c.id}
          contact={c}
          onEdit={onEdit}
          onDelete={confirmDelete}
        />
      ))}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>¿Seguro que deseas eliminar este contacto?</p>
            <button onClick={handleDelete}>Sí, eliminar</button>
            <button
              onClick={() => {
                setShowModal(false);
                setToDelete(null);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
