const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const heroRouter = require("./routers/heroes.route");
const uploadRouter = require("./routers/upload.route");

const app = express();

const DB_URL = `mongodb+srv://admin:admin@whatever-cluster.rtsxp.mongodb.net/?retryWrites=true&w=majority&appName=whatever-cluster`;
const PORT = 4000;

// expressjs initialization
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(cors());


// connecting routes
app.use("/api/heroes", heroRouter);
app.use("/api", uploadRouter )

// connecting to the mongodb database
const startApp = async () => {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () =>
      console.log(`server is connected and running on ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};
startApp();


