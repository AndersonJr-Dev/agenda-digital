const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Render login page
exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    errorMessage: null,
  });
};

// Handle login form submission
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.render("auth/login", {
        pageTitle: "Login",
        errorMessage: "Email ou senha inválidos.",
      });
    }

    // Check password
    const doMatch = await bcrypt.compare(password, user.password);
    if (!doMatch) {
      return res.render("auth/login", {
        pageTitle: "Login",
        errorMessage: "Email ou senha inválidos.",
      });
    }

    // Set session
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/contacts");
    });
  } catch (err) {
    console.log(err);
    res.redirect("/login");
  }
};

// Render signup page
exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    errorMessage: null,
  });
};

// Handle signup form submission
exports.postSignup = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    // Check if password meets requirements
    if (password.length < 6 || password.length > 12) {
      return res.render("auth/signup", {
        pageTitle: "Signup",
        errorMessage: "A senha deve ter entre 6 e 12 caracteres.",
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.render("auth/signup", {
        pageTitle: "Signup",
        errorMessage: "As senhas não coincidem.",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.render("auth/signup", {
        pageTitle: "Signup",
        errorMessage: "Este email já está cadastrado.",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      contacts: [],
    });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.redirect("/signup");
  }
};

// Handle logout
exports.postLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/login");
  });
};
