var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var User = require('../models/user');

/* GET users listing. */
router.get('/', (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
});



router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (!err) {
      res.json(data);
    }
  });
});

router.post('/', (req, res) => {

  const user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.privateNumber = req.body.privateNumber;
  user.workNumber = req.body.workNumber;
  user.save((err, doc) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "User successfully added"
      });
    }
    else {
      res.status(201).json({
        success: false,
        message: "User could not be added"
      })
    }
  });

});

router.patch('/update/:id', (req, res) => {
  const { id } = req.params;
  User.findOneAndUpdate({ _id: id }, req.body, { new: true }, (err, doc) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "User successfully updated"
      });
    }
    else {
      res.status(201).json({
        success: false,
        message: "User could not be updated"
      })
    }
  })

})

router.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, doc) => {
    if (!err) {
      res.status(200).json({
        success: true,
        message: "User succesfully deleted"
      });
    }
    else {
      res.status(201).json({
        success: false,
        message: "User could not be deleted"
      })
    }
  })

})



module.exports = router;
