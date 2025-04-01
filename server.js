const express = require("express");
const cors = require("cors");
require("dotenv").config();

const etudiantRoutes = require("./routes/etudiantRoutes");
const institutionRoutes = require("./routes/institutionRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Route de test
app.get("/", (req, res) => {
  res.send("Hello from back NOVANIRY");
});

// Routes principales
app.use("/api", etudiantRoutes);
app.use("/api", institutionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
