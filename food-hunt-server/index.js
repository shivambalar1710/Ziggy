const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const imageRoute = require("./routes/image");
const userRoute = require("./routes/user");
const foodRoute = require("./routes/food");
const orderRoute = require("./routes/order");
const discountRoute = require("./routes/discount");
const app = express();

const cors = require("cors");
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 8001;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

//connect db

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("connected");
});
app.use("/api/v1/all", imageRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/food", foodRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1", discountRoute);

app.use(express.json({ limit: "2mb" }));

app.listen(port, () => {
  connect();
  console.log(`Listening from ${port}`);
});
