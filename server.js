const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
const upload = multer({dest: __dirname + "/public/images/menu"});



/*
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
*/
mongoose
    .connect("mongodb+srv://tylerlogue3:HwKBox8tlEn2Ylb8@work.5tc5e9m.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("connected to MongoDB"))
    .catch(error => console.log("couldn't connect to mongodb", error));

    const bagelSchema = new mongoose.Schema({
        name: String,
        description: String,
        ingredients: [String],
        img: String,
    });

    const Bagel = mongoose.model("bagel", bagelSchema);

    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/mainPage.html");
    });

    app.get("/menu", (req, res) => {
        res.sendFile(__dirname + "/menu.html");
    });

    app.get("/catering", (req, res) => {
        res.sendFile(__dirname + "/catering.html");
    });

    app.get("/contact", (req, res) => {
        res.sendFile(__dirname + "/contact.html");
    });

    app.get("/locations", (req, res) => {
        res.sendFile(__dirname + "/locations.html");
    });




    app.post("/api/bagels", upload.single("img"), (req, res) => {
        const result = validateBagel(req.body);
        if(result.error) {
            res.status(400).send(result.error.details[0].message);
            return;
        }

        const bagel = new Bagel({
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients.split(","),
        });

        if(req.file) {
            bagel.img = "public/images/" + req.file.filename;
        }
        createBagel(bagel, res);
    });

    app.get("/api/bagels", (req, res) => {
        getBagels(res);
    });

    const getBagels = async (res) => {
        const bagels = await Bagel.find();
        res.send(bagels);
    };

    app.get("/api/bagels/:id", (req, res) => {
        getBagel(req.params.id, res);
    });

    const getBagel = async (id, res) => {
        const bagel = await Bagel.findOne({_id: id });
        res.send(bagel);
    };

    const createBagel = async (bagel, res) => {
        const result = await bagel.save();
        res.send(result);
    };

    app.delete("/api/bagels/:id", (req, res) => {
        deleteBagel(res, req.params.id);
    });

    const deleteBagel = async (res, id) => {
        const bagel = await Bagel.findByIdAndDelete(id);
        res.send(bagel);
    };

    app.put("/api/bagels/:id", upload.single("img"), (req, res) => {
        const result = validateBagel(req.body);
        if(result.error) {
            res.status(400).send(result.error.details[0].message);
            return;
        }
        updateBagel(req, res);
    });

    const updateBagel = async (req, res) => {
        let field = {
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients.split(","),
        }
        if(req.file) {
            field.img = "images/menu/" + req.file.filename;
        }
        const result = await Bagel.updateOne({_id: req.params.id }, field);

        res.send(result);
    };

    const validateBagel = (bagel) => {
        const schema = Joi.object({
            name: Joi.string().min(3).required(),
            description: Joi.string().min(3).required(),
            ingredients: Joi.allow("").required(),
            _id: Joi.allow(""),
            img: Joi.object({
                filename: Joi.string().required(),
            }),
        });
    return schema.validate(bagel);
};

app.listen(3008, () => {
    console.log("I'm Listening");
});
