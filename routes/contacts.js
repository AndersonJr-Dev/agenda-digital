const express = require("express");
const router = express.Router();

const contactsController = require("../controllers/contacts");

// Middleware to check if user is authenticated
router.use(contactsController.isAuth);

// GET /contacts - Display all contacts
router.get("/contacts", contactsController.getContacts);

// GET /add-contact - Display add contact form
router.get("/add-contact", contactsController.getAddContact);

// POST /add-contact - Create new contact
router.post("/add-contact", contactsController.postAddContact);

// GET /edit-contact/:contactId - Display edit contact form
router.get("/edit-contact/:contactId", contactsController.getEditContact);

// POST /edit-contact - Update contact
router.post("/edit-contact", contactsController.postEditContact);

// POST /delete-contact - Delete contact
router.post("/delete-contact", contactsController.postDeleteContact);

module.exports = router;
