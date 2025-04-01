const express = require("express");
const router = express.Router();
const {
  getAllInstitutions,
  createInstitution,
} = require("../controllers/institutionController");

router.get("/institutions", getAllInstitutions);
router.post("/institution", createInstitution);

module.exports = router;
