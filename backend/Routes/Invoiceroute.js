const express = require('express');
const {triggerZapier, getdata } = require("../Controllers/Invoicecontroller");
const router = express.Router();


router.post('/trigger', triggerZapier);

router.get("/getdata",getdata);

module.exports = router;
