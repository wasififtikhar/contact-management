import React, { useState, useEffect } from "react";
import "./App.css";

const ContactForm = ({
  addContact,
  updateContact,
  updateContactIndex,
  setUpdateContactIndex,
  updateContactData,
}) => {
  const initialFormData = {
    name: "",
    contactNumber: "",
    email: "",
    gender: "male",
    age: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (updateContactIndex !== null) {
      setFormData(updateContactData);
    } else {
      setFormData(initialFormData);
    }
  }, [updateContactIndex, updateContactData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (updateContactIndex !== null) {
      // If updating, call the updateContact function
      updateContact(formData);
    } else {
      // If adding a new contact, call the addContact function
      addContact(formData);
    }

    // Clear the form and reset update state
    setFormData(initialFormData);
    setUpdateContactIndex(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.value}
        onChange={(e) => handleChange(e)}
        required
      />

      <label htmlFor="contactNumber">Contact Number:</label>
      <input
        type="tel"
        id="contactNumber"
        name="contactNumber"
        value={formData.value}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.value}
        onChange={handleChange}
        required
      />

      <label htmlFor="gender">Gender:</label>
      <select
        id="gender"
        name="gender"
        value={formData.value}
        onChange={handleChange}
        required
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        name="age"
        value={formData.value}
        onChange={handleChange}
        required
      />

      <button type="submit">
        {updateContactIndex !== null ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
};

const ContactList = ({ contacts, updateContact, deleteContact }) => {
  return (
    <ul>
      {contacts.map((contact, index) => (
        <li key={index}>
          <strong>{contact.name}</strong> ({contact.age} years)
          <br />
          Contact: {contact.contactNumber}
          <br />
          Email: {contact.email}
          <br />
          Gender: {contact.gender}
          <br />
          <button onClick={() => updateContact(index)}>Update</button>
          <button onClick={() => deleteContact(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [updateContactIndex, setUpdateContactIndex] = useState(null);
  const [updateContactData, setUpdateContactData] = useState({});

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(storedContacts);
  }, []);

  const addContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
  };

  const updateContact = (updatedContact) => {
    const updatedContacts = [...contacts];
    updatedContacts[updateContactIndex] = updatedContact;

    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    setContacts(updatedContacts);

    // Clear the update state
    setUpdateContactIndex(null);
    setUpdateContactData({});
  };

  const handleUpdateClick = (index) => {
    setUpdateContactIndex(index);
    setUpdateContactData(contacts[index]);
  };

  const deleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
  };

  return (
    <div className="container">
      <h1>Contact Management</h1>
      <ContactForm
        addContact={addContact}
        updateContactIndex={updateContactIndex}
        setUpdateContactIndex={setUpdateContactIndex}
        updateContactData={updateContactData}
        updateContact={updateContact}
      />
      <h2>Contact List</h2>
      <ContactList
        contacts={contacts}
        updateContact={handleUpdateClick}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
