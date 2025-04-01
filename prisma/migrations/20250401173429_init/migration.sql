-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "workflow_user";

-- CreateEnum
CREATE TYPE "workflow_user"."TypeUtilisateur" AS ENUM ('ETUDIANT', 'INSTITUTION', 'SPONSOR', 'ADMINISTRATEUR');

-- CreateTable
CREATE TABLE "workflow_user"."Utilisateur" (
    "user_id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mot_de_passe" TEXT NOT NULL,
    "type_utilisateur" "workflow_user"."TypeUtilisateur" NOT NULL,
    "date_inscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statut" TEXT NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "workflow_user"."Etudiant" (
    "etudiant_id" TEXT NOT NULL,
    "date_naissance" TIMESTAMP(3) NOT NULL,
    "niveau_etude" TEXT NOT NULL,
    "dossier_candidature" TEXT NOT NULL,
    "statut_inscription" TEXT NOT NULL,
    "notifications" TEXT,

    CONSTRAINT "Etudiant_pkey" PRIMARY KEY ("etudiant_id")
);

-- CreateTable
CREATE TABLE "workflow_user"."Institution" (
    "institution_id" TEXT NOT NULL,
    "nom_institution" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,
    "contact_telephone" TEXT NOT NULL,
    "description" TEXT,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "admin_id" TEXT NOT NULL,

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("institution_id")
);

-- CreateTable
CREATE TABLE "workflow_user"."Sponsor" (
    "sponsor_id" TEXT NOT NULL,
    "nom_sponsor" TEXT NOT NULL,
    "logo" TEXT,
    "secteur" TEXT NOT NULL,
    "site_web" TEXT,
    "contact_email" TEXT NOT NULL,
    "contact_telephone" TEXT NOT NULL,
    "date_signature_contrat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("sponsor_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "workflow_user"."Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_admin_id_key" ON "workflow_user"."Institution"("admin_id");
