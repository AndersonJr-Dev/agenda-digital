// Carregar variáveis de ambiente do arquivo .env
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const path = require("path");

// Routes
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contacts");

// App initialization
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI;

// Session store
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// Set view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Routes
app.use(authRoutes);
app.use(contactRoutes);

// Redirect to login if not found
app.use("/", (req, res) => {
  res.redirect("/login");
});

// Connect to MongoDB and start server
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB Atlas", err);
  });
