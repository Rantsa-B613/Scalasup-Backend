const express = require("express");
const {
  getAllEtudiants,
  createEtudiant,
} = require("../controllers/etudiantController");
const router = express.Router();

router.get("/etudiants", getAllEtudiants);
router.post("/etudiant", createEtudiant);

module.exports = router;
