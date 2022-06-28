const { Contact } = require("../models/contactShema");

const listContacts = async (_id) => {
  const data = await Contact.find({ owner: _id });
  return data;
};

const getContactById = async (contactId, _id) => {
  const data = await Contact.findById({ _id: contactId, owner: _id });
  return data;
};

const addContact = async (body, _id) => {
  const newContact = new Contact({ ...body, owner: _id });
  const data = await newContact.save();
  return data;
};

const removeContact = async (contactId, _id) => {
  const data = await Contact.findByIdAndRemove({ _id: contactId, owner: _id });
  return data;
};

const updateContact = async (contactId, _id, body) => {
  const data = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: _id },
    { $set: body },
    { new: true }
  );
  return data;
};

const togleFavorite = async (contactId, _id, body) => {
  const data = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: _id },
    { $set: body },
    { new: true }
  );
  return data;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  togleFavorite,
};
