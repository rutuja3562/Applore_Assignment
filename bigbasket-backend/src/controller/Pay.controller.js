const express = require("express");
const router = express.Router();
const Razorpay1 = require("../models/pay.module");
// const User = require("../models/user.module");

router.get("", async (req, res) => {
  try {
    const pay = await Razorpay1.find().lean().exec();
    return res.send(pay);
  } catch (err) {
  
    return res.status(500).send({ message: err.message });
  }
});
router.post("", async (req, res) => {
  
  try {
    const users = await Razorpay1.create(req.body);
    return res.send(users);
  } catch (err) {
    
    return res.status(500).send({ message: err.message });
  }
});
module.exports = router;