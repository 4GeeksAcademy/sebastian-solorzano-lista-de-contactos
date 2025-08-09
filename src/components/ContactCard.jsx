import React from "react";
import "./ContactCard.css";

export default function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      <img
        src={contact.avatar || "https://via.placeholder.com/50"}
        alt="avatar"
      />
      <div className="contact-card-details">
        <strong>{contact.full_name}</strong>
        <p>{contact.address}</p>
        <p>{contact.phone}</p>
        <p>{contact.email}</p>
      </div>
      <div className="contact-card-actions">
        <button onClick={() => onEdit(contact)}>✏️</button>
        <button onClick={() => onDelete(contact)}>🗑️</button>
      </div>
    </div>
  );
}
