const userRoute = require("./routes/users");
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRoute = require("./routes/post");
const authRoute = require("./routes/auth");
const categoyRoute = require("./routes/categories");
const app = express();
const path = require("path");

// pour configurer le dotenv
dotenv.config();
// permet de pouvoir envoyer ou recevoir des données sous forme json()
app.use(express.json());
app.use(cors());
// On établi la connection à la base de donnée
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(console.log("Yes! la connexion marche ok"))
  .catch((error) => console.log(error));

//   ==================== creation d'un storage avec multer ================
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

app.post("/api/upload", upload.single("file"), (req, response) => {
  response.status(200).json("File has been auploaded");
});

// =============== Middleware ==============
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoyRoute);

// ======================
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
// ======================

// ==============================
app.use("/images", express.static(path.join(__dirname, "/images")));
// ===============================

// =============== Port ====================
// http://localhost:5000/api/posts

// Creating http Server
app.listen(process.env.PORT || 5000);
