import React, { useState, useEffect } from "react";
import { useContacts } from "../context/ContactContext";
import "./AddContact.css";

export default function AddContact({ selectedContact, clearSelection }) {
  const { addContact, updateContact } = useContacts();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "https://1.bp.blogspot.com/_WxZRPiak6iI/TOlYFJyFJuI/AAAAAAAACk4/4G_AqKi-qgo/s1600/Fania_All_Stars_by_traydaripper.jpg",
  });

  useEffect(() => {
    if (selectedContact) {
      setForm(selectedContact);
    } else {
      setForm({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        avatar: "",
      });
    }
  }, [selectedContact]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedContact) {
      updateContact(selectedContact.id, form);
    } else {
      addContact(form);
    }
    clearSelection();
  };

  return (
    <form onSubmit={handleSubmit} className="add-contact-form">
      <h3>{selectedContact ? "Editar contacto" : "Agregar nuevo contacto"}</h3>
      <input
        type="text"
        name="full_name"
        placeholder="Nombre completo"
        value={form.full_name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Teléfono"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Dirección"
        value={form.address}
        onChange={handleChange}
      />
      <input
        type="text"
        name="avatar"
        placeholder="URL avatar"
        value={form.avatar}
        onChange={handleChange}
      />
      <button type="submit">{selectedContact ? "Actualizar" : "Agregar"}</button>
      {selectedContact && (
        <button type="button" onClick={clearSelection} className="btn-cancel">
          Cancelar
        </button>
      )}
    </form>
  );
}
