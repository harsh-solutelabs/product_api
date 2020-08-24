const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const UserModel = require("./model/userModel");
const routes = require("./routes/loginAndSigup");
const userSecureRoutes = require("./routes/userSecure-routes");
const productSecureRoutes = require("./routes/productSecure");
const multer = require('multer');
const path = require('path');



mongoose.connect("mongodb://127.0.0.1:27017/product-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

require("./auth/auth");

app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/public'));



app.use("/", routes);

app.use("/user", passport.authenticate("jwt", { session: false }), userSecureRoutes);
app.use("/product", passport.authenticate("jwt", { session: false }), productSecureRoutes);

//Handle errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log("Server started");
});
