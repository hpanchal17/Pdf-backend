// const express = require("express");
const router = require("express").Router();
const { register, login, loginDemo } = require("../controllers/authController");

router.post("/register", register);
// router.post("/login", login);
router.post("/login/demo", loginDemo);

module.exports = router;
