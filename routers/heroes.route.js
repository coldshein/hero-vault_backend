const express = require("express");
const {
  createHero,
  deleteHero,
  updateHero,
  getHeroById,
  getHeroes,
} = require("../controllers/hero.controller");

const router = express.Router();

// delete
router.delete("/:id", deleteHero);

// creating
router.post("/", createHero);

// updating
router.put("/:id", updateHero);

// get all
router.get("/", getHeroes);

// get by id
router.get("/:id", getHeroById);


module.exports = router;