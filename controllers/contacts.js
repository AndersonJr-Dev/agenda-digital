const Contact = require("../models/contact");
const User = require("../models/user");

// Middleware to check if user is authenticated
exports.isAuth = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.session.user._id });
    res.render("contacts/index", {
      pageTitle: "Meus Contatos",
      contacts: contacts,
      path: "/contacts",
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

// Get add contact form
exports.getAddContact = (req, res) => {
  res.render("contacts/edit-contact", {
    pageTitle: "Adicionar Contato",
    editing: false,
    errorMessage: null,
    contact: { name: "", email: "", phone: "", address: "" },
    path: "/add-contact",
  });
};

// Post add contact
exports.postAddContact = async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !phone) {
    return res.render("contacts/edit-contact", {
      pageTitle: "Adicionar Contato",
      editing: false,
      errorMessage: "Nome e telefone são obrigatórios",
      contact: { name, email, phone, address },
      path: "/add-contact",
    });
  }

  try {
    const contact = new Contact({
      name,
      email,
      phone,
      address,
      userId: req.session.user._id,
    });
    await contact.save();
    res.redirect("/contacts");
  } catch (err) {
    console.log(err);
    res.redirect("/add-contact");
  }
};

// Get edit contact form
exports.getEditContact = async (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/contacts");
  }

  const contactId = req.params.contactId;
  try {
    const contact = await Contact.findById(contactId);
    if (
      !contact ||
      contact.userId.toString() !== req.session.user._id.toString()
    ) {
      return res.redirect("/contacts");
    }

    res.render("contacts/edit-contact", {
      pageTitle: "Editar Contato",
      editing: true,
      contact: contact,
      errorMessage: null,
      path: "/contacts",
    });
  } catch (err) {
    console.log(err);
    res.redirect("/contacts");
  }
};

// Post edit contact
exports.postEditContact = async (req, res) => {
  const { contactId, name, email, phone, address } = req.body;

  if (!name || !phone) {
    return res.render("contacts/edit-contact", {
      pageTitle: "Editar Contato",
      editing: true,
      errorMessage: "Nome e telefone são obrigatórios",
      contact: { _id: contactId, name, email, phone, address },
      path: "/contacts",
    });
  }

  try {
    const contact = await Contact.findById(contactId);
    if (
      !contact ||
      contact.userId.toString() !== req.session.user._id.toString()
    ) {
      return res.redirect("/contacts");
    }

    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.address = address;

    await contact.save();
    res.redirect("/contacts");
  } catch (err) {
    console.log(err);
    res.redirect("/contacts");
  }
};

// Post delete contact
exports.postDeleteContact = async (req, res) => {
  const { contactId } = req.body;
  try {
    const contact = await Contact.findById(contactId);
    if (
      !contact ||
      contact.userId.toString() !== req.session.user._id.toString()
    ) {
      return res.redirect("/contacts");
    }

    await Contact.findByIdAndDelete(contactId);
    res.redirect("/contacts");
  } catch (err) {
    console.log(err);
    res.redirect("/contacts");
  }
};
