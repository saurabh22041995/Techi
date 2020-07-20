var express = require('express')
var router = express.Router()
const { check, validationResult } = require('express-validator');
const { signup, signin } = require("../controllers/auth")

router.post("/signup", signup)

router.post("/signin",signin)

module.exports = router;