const functions = require("firebase-functions");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://yum-dash-default-rtdb.firebaseio.com",
});

const express = require("express");
const cors = require("cors");
// Main App
const app = express();
app.use(cors({origin: true}));

// main db refrence
const db = admin.firestore();

// Routes
app.get("/", (req, res) => {
  return res.status(200).send("hello there...");
});
// create => post()
app.post("/api/products/create", async (req, res) => {
  try {
    const productData = {
      id: req.body.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.desc,
      category: req.body.category,
    };

    // Use the set method instead of create for simplicity
    await db.collection("products").doc(String(productData.id)).set(productData);

    return res.status(200).json({status: "success", msg: "Product saved", data: productData});
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({status: "error", msg: "Internal server error"});
  }
});

// get => get()

// update => put()

// Delete => delete()

// exports the api to firebase cloud functions
exports.app = functions.https.onRequest(app);

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
