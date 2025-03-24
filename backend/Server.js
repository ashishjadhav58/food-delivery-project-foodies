const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const Restaurant = require("./Models/Restaurant");
const cors = require("cors");
const mongoose = require("mongoose");
const Order = require("./Models/Order.js")
const userdata = require("./Models/userdata.js");
const Product = require("./Models/product.js")
const OrderHistory = require("./Models/OrderHistory.js")
const BusinessData = require("./Models/BusinessData.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin:  "*",
    methods: ["GET", "POST","DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Database Connected Successfully"))
  .catch((error) => console.log("❌ Database Connection Error:", error));


app.post("/api/register", async (req, res) => {
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
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.get('/api/products', async (req, res) => {
  try {
      const products = await Product.find();
      res.json(products);
  } catch (error) {
      res.status(500).json({ error: 'Server Error' });
  }  
});

app.get('/api/top/products', async (req, res) => {
  try {
    const products = await Restaurant.find().limit(4); // Fetch only 4 products
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});


app.get("/api/restaurants", async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);    
  } catch (err) {
    res.status(500).json({ error: "Error fetching restaurants" });
  }
});

app.get("/api/order/addcart/food/:id", async (req, res) => {
  try {
    const { id } = req.params;  
    const response = await Order.find({ userId: id, type: 2 }); 
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "500", error: error.message });
  }
});

app.get("/api/order/addcart/dining/:id", async (req, res) => {
  try {
    const { id } = req.params; 
    const response = await Order.find({ userId: id, type: 1 });
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "500", error: error.message });
  }
});


app.post("/api/order", async (req,res)=>{
  try{
    const {productId , userId ,image, name ,type, price,quantity,restaurant} = req.body;
    const newOrder = new Order ({
      productId , userId , name,image , price,quantity,restaurant,type
    })    
    newOrder.save();
    res.json({status:"200"})
  }
  catch(e){
    res.json({status:"404"})
  }
})

app.delete("/api/order/addcart/food/delete/:id", async (req, res) => {
  try {
    const id = req.params.id; // Correct destructuring
    await Order.deleteOne({ _id: id }); // Await the deletion process
    const response2 = await Order.find({ userId: id, type: 2 });
    res.status(200).json(response2);
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ status: "500", message: "Internal Server Error" });
  }
});

app.delete("/api/order/addcart/dining/delete/:id", async (req, res) => {
  try {
    const { id } = req.params; // Correct destructuring
    await Order.deleteOne({ _id: id }); // Await the deletion process 
    const response2 = await Order.find({ userId: id, type: 1 });
    res.status(200).json(response2);
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ status: "500", message: "Internal Server Error" });
  }
});
app.post("/api/order/history/post/:id", async (req, res) => {
  try {
    console.log("ere ali");
    const id = req.params.id; // Get ID from request body
    console.log(id);
    const user = await Order.findOne({ _id: id});

    if (!user) {
      return res.status(404).json({ status: "404", message: "Order not found" });
    }

    console.log(user);

    // Destructure order details
    const { productId, userId, image, name, type, price, quantity, restaurant } = user;

    // Create new order history entry
    const newOrder = new OrderHistory({
      productId,
      userId,
      name,
      image,
      price,
      quantity,
      restaurant,
      type,
    });

    await newOrder.save();
    await Order.deleteOne({ _id: id });

    res.json({ status: "200", message: "Order moved to history" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "500", message: "Internal Server Error" });
  }
});


app.get("/api/order/history/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const response = await OrderHistory.find({userId:id});
    res.json(response)
  }
  catch(Err){
    res.json({status:"400"})
  }
}) 

// business Login signup

app.post("/api/admin/signin",async (req,res)=>{
  const {email,password} = req.body;
  console.log("ali");
  
  try{
    const data = await BusinessData.findOne({resemail:email,password:password})
    if(!data){
      res.json({status:"404",msg:"Invalid"})
    }
   else{
    res.json({
      success: true,
      message: "Login successful",
      userName: data.resname,
      userId: data._id,
    });
   }
  }
  catch(e){
    res.json({status:"404",msg:"Invalid"}) 
  }
})

app.post("/api/admin/signup",async (req,res)=>{
  const {email,name,address,password} = req.body;
  try{
    const m  = await BusinessData.findOne({resemail:email});
    if(!m){
    const newd = new BusinessData({
      resname:name,
      resemail:email,
      address:address,
      password:password
    })
    await newd.save();
    res.json({status:"200",msg:"Grand"})}
    else{
      res.json({status:"404",msg:"Already have Account"})
    }
  }
  catch(e){
    res.json({status:"404",msg:"Invalid"}) 
  }
})

app.post("/api/restaurants", async (req, res) => {
  console.log("ali");
  const { restaurantName,email, discount, availableSeats, contact, openingTime, closingTime } = req.body;

  try {
      let restaurant = await Restaurant.findOne({ name: restaurantName });
      let m = await BusinessData.findOne({email:email})
      if (restaurant) {
          // Update existing restaurant
          restaurant.discount = discount;
          restaurant.availableSeats = availableSeats;
          restaurant.contact = contact;
          restaurant.openingTime = openingTime;
          restaurant.closingTime = closingTime;
          await restaurant.save();
          return res.status(200).json({ message: "Restaurant updated successfully!", restaurant });
      } else {
          const newRestaurant = new Restaurant({
              name: restaurantName,
              seat: availableSeats,
              contact: contact,
              openingTime: openingTime,
              closingTime:closingTime,
              email:email,
              rating:5,
              address:m.address,
              image:"https://images.unsplash.com/photo-1514513879701-9c82437eab62",
          });

          await newRestaurant.save();
          return res.status(201).json({ message: "Restaurant added successfully!", newRestaurant });
      }
  } catch (error) {
      console.error("Error saving restaurant:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => console.log(` Server running on port ${port}`));
