const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

// GET /login
router.get("/login", authController.getLogin);

// POST /login
router.post("/login", authController.postLogin);

// GET /signup
router.get("/signup", authController.getSignup);

// POST /signup
router.post("/signup", authController.postSignup);

// POST /logout
router.post("/logout", authController.postLogout);

module.exports = router;
