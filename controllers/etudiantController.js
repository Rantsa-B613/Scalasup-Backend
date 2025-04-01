const prisma = require("../config/prismaClient.js");

// Fonction pour lister tous les étudiants
const getAllEtudiants = async (req, res) => {
  try {
    const etudiants = await prisma.etudiant.findMany({
      include: { utilisateur: true }, // Inclure les infos de l'utilisateur lié
    });
    return res.json(etudiants);
  } catch (error) {
    console.error("Erreur lors de la récupération des étudiants", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des étudiants",
    });
  }
};

// Fonction pour créer un nouvel utilisateur Etudiant
const createEtudiant = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    mot_de_passe,
    date_naissance,
    niveau_etude,
    dossier_candidature,
    statut_inscription,
  } = req.body;

  try {
    // Créer un utilisateur de type ETUDIANT
    const utilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        mot_de_passe,
        type_utilisateur: "ETUDIANT",
        statut: "Actif",
      },
    });

    // Créer l'étudiant lié à l'utilisateur
    const etudiant = await prisma.etudiant.create({
      data: {
        date_naissance,
        niveau_etude,
        dossier_candidature,
        statut_inscription,
        utilisateur: {
          connect: { user_id: utilisateur.user_id }, // Lier l'étudiant à l'utilisateur
        },
      },
    });

    return res
      .status(201)
      .json({ message: "Étudiant créé avec succès", etudiant });
  } catch (error) {
    console.error("Erreur lors de la création de l'étudiant:", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors de la création de l'étudiant",
      details: error.message,
    });
  }
};

module.exports = {
  getAllEtudiants,
  createEtudiant,
};
