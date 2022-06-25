const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  togleFavorite,
} = require("../servises/contact");
const { WrongParametrsError } = require("../middlewares/helpers/errors");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const contacts = await listContacts(_id);
  res.status(200).json(contacts);
};

const getOneById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contact = await getContactById(contactId, _id);
  contact
    ? res.status(200).json(contact)
    : res.status(400).json({ message: `no contact with id ${contactId}` });
};

const postNew = async (req, res) => {
  const { _id } = req.user;
  const newContact = await addContact(req.body, _id);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const contact = await removeContact(contactId, _id);
  contact
    ? res.status(200).json({ message: `contact: ${contact.name} is deleted` })
    : res.status(404).json({ message: "Not found" });
};

const putById = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new WrongParametrsError("missing fields");
  }
  const { _id } = req.user;
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, _id, req.body);
  updatedContact
    ? res.status(200).json(updatedContact)
    : res.status(404).json({ message: "Not found" });
};

const patchFavotite = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new WrongParametrsError("missing field favorite");
  }
  const { _id } = req.user;
  const { contactId } = req.params;
  const updatedContact = await togleFavorite(contactId, _id, req.body);
  updatedContact
    ? res.status(200).json(updatedContact)
    : res.status(404).json({ message: "Not found" });
};

module.exports = {
  getAll,
  getOneById,
  postNew,
  deleteById,
  putById,
  patchFavotite,
};
