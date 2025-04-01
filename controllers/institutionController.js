const prisma = require("../config/prismaClient.js");

// Fonction pour lister toutes les institutions
const getAllInstitutions = async (req, res) => {
  try {
    const institutions = await prisma.institution.findMany({
      include: { admin: true }, // Inclure les infos de l'administrateur lié
    });
    return res.json(institutions);
  } catch (error) {
    console.error("Erreur lors de la récupération des institutions:", error);
    return res.status(500).json({
      error: "Une erreur lors de la récupération des institutions",
    });
  }
};

// Fonction pour créer une nouvelle institution
const createInstitution = async (req, res) => {
  const {
    nom,
    prenom,
    email,
    mot_de_passe,
    nom_institution,
    adresse,
    contact_email,
    contact_telephone,
    description,
  } = req.body;

  try {
    // Créer un utilisateur de type INSTITUTION
    const utilisateur = await prisma.utilisateur.create({
      data: {
        nom,
        prenom,
        email,
        mot_de_passe,
        type_utilisateur: "INSTITUTION",
        statut: "Actif",
      },
    });

    // Créer l'institution liée à l'utilisateur
    const institution = await prisma.institution.create({
      data: {
        nom_institution,
        adresse,
        contact_email,
        contact_telephone,
        description,
        admin: {
          connect: { user_id: utilisateur.user_id }, // Lier l'institution à l'administrateur
        },
      },
    });

    return res.status(201).json({
      message: "Institution créée avec succès",
      institution,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'institution:", error);
    return res.status(500).json({
      error: "Une erreur est survenue lors de la création de l'institution",
      details: error.message,
    });
  }
};

module.exports = {
  getAllInstitutions,
  createInstitution,
};
