const express = require("express");
const app = express();
const port = 3000;
const Restaurant = require("./Models/Restaurant");
const cors = require("cors");
const mongoose = require("mongoose");
const userdata = require("./Models/userdata.js");
const Product = require("./Models/product.js")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

mongoose
  .connect(
    "mongodb+srv://foodies:foodies@foodiescluster.f908v.mongodb.net/user?retryWrites=true&w=majority&appName=foodiescluster"
  )
  .then(() => console.log("Database Connected Successfully"))
  .catch((error) => console.log("Database Connection Error: " + error));

// Register API
app.post("/api/register", async (req, res) => {
  console.log("✅ Request received:", req.body);
  const { name, email, address, password } = req.body;

  try {
    const newUser = new userdata({ name, email, address, password });
    const savedUser = await newUser.save();

    res.json({
      status: "200",
      message: "User Registered Successfully",
      userId: savedUser._id,
      userName: savedUser.name,
    });
  } catch (error) {
    console.error("Error Registering User:", error);
    res.status(500).json({ status: "500", message: "Internal Server Error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userdata.findOne({ email });

    if (!user || user.password !== password) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      message: "Login successful",
      userName: user.name,
      userId: user._id,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
  console.log("req ali");
});

app.get('/api/products', async (req, res) => {
  try {
      const products = await Product.find();
      console.log
       (products)
      res.json(products);
  } catch (error) {
      res.status(500).json({ error: 'Server Error' });
  }
  console.log("request ali");
  
});

app.get('/api/top/products', async (req, res) => {
  try {
    const products = await Product.find().limit(4); // Fetch only 4 products
    console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
  console.log("Request received");
});


app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
    console.log("request ali restro");
    
  } catch (err) {
    res.status(500).json({ error: "Error fetching restaurants" });
  }
});

app.listen(port, () => console.log(` Server running on port ${port}`));
