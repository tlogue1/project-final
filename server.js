const express = require("express");
const app = express();
const Joi = require("joi");
const multer = resquire("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const upload = multer({dest: __dirnmae + "/public/images"});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

mongoose
    .connect("")//add my mongoose thing here at the end
    .then(() => console.log("connected to MongoDB"))
    .catch(error => console.log("couldmt connect to mongodb", error));

    