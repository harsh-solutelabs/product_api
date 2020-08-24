const express = require("express");
const Product = require("../model/productModel");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + file.originalname;
      req.file = filename;
      cb(null, filename);
    },
  });
  
  const fileFilter = (req, file, cb) => {
    if (true) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const uploads = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter,
  });

router.post(
  "/add",
  uploads.fields([
    {
      name: "product",
      maxCount: 1,
    },
  ]),
  async (req, res, next) => {
    //   console.log(req.file);
    const product = new Product({
      ...req.query,
      image: "localhost:3000/images/" + req.file,
      User: req.user._id,
    });
    console.log(product);

    try {
      await product.save();
      res.status(201).send(product);
    } catch (e) {
      //   console.log(e);
      res.status(400).send(e);
    }
  }
);

router.patch("/update", async (req, res, next) => {
  console.log(req.query.id);
  try {
    const updateProduct = await Product.findOneAndUpdate(
      { _id: req.query.id },
      { ...req.query },
      { new: true }
    );
    res.status(201).send(updateProduct);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.patch("/delete", async (req, res, next) => {
  console.log(req.query.id);
  try {
    const deleteProduct = await Product.deleteOne({ _id: req.query.id });
    res.status(201).send(deleteProduct);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/all", async (req, res, next) => {
  console.log(req.user._id);
  try {
    const allProduct = await Product.find({ User: req.user._id });
    res.status(201).send(allProduct);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});


// router.post(
//   "/upload-product",
//   uploads.fields([
//     {
//       name: "product",
//       maxCount: 1,
//     },
//   ]),
//   async (req, res) => {
//     console.log(req.file);
//     res.status(200).send({
//       path: "localhost:3000/images/" + req.file,
//     });
//   }
// );

module.exports = router;
