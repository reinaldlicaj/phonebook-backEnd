var express = require("express");
var router = express.Router();
require("mongoose");
var User = require("../models/user");

/* GET users listing. */
router.get("/", (req, res) => {
    let { page, size, sort } = req.query;
    page = page || 1;
    size = size || 10;
    sort = sort || 1;

    const limit = parseInt(size);
    const skip = (page - 1) * size;

    User.find({}, {}, { limit, skip, sort: { firstName: sort }, collation: { locale: "en" } }, (err, data) => {
        if (!err) {
            res.send({
                page,
                size,
                data: data,
            });
        } else {
            console.log(err.message);
            res.status(201).json({
                success: false,
                message: "Users could not be fetched",
            });
        }
    });
});

router.get("/:id", (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if (!err) res.json(data);

        res.status(201).json({
            success: false,
            message: "User could not be fetched",
        });
    });
});

router.post("/", (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
        if (!err) {
            res.status(200).json({
                success: true,
                id: user._id,
                message: "User successfully added",
            });
        } else {
            res.status(201).json({
                success: false,
                message: "User could not be added",
            });
        }
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    User.findOneAndUpdate({ _id: id }, req.body, (err) => {
        if (!err) {
            res.status(200).json({
                success: true,
                message: "User successfully updated",
            });
        } else {
            res.status(201).json({
                success: false,
                message: "User could not be updated",
            });
        }
    });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id, (err) => {
        if (!err) {
            res.status(200).json({
                success: true,
                message: "User successfully deleted",
            });
        } else {
            res.status(201).json({
                success: false,
                message: "User could not be deleted",
            });
        }
    });
});

module.exports = router;
