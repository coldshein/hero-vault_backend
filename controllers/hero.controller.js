const Hero = require("../model/heroModel");

const getHeroes = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const heroes = await Hero.find({}).skip(skip).limit(parseInt(limit));
    const totalHeroes = await Hero.countDocuments();

    res.status(200).json({
      heroes,
      totalHeroes,
      totalPages: Math.ceil(totalHeroes / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHeroById = async (req, res) => {
  try {
    const { id } = req.params;
    const hero = await Hero.findById(id);
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHero = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHero = await Hero.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedHero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.status(200).json(updatedHero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createHero = async (req, res) => {
  try {
    const newHero = await Hero.create(req.body);
    res.status(201).json(newHero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteHero = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHero = await Hero.findByIdAndDelete(id);

    if (!deletedHero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    res.status(200).json({ message: "Hero has been deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHeroes,
  getHeroById,
  updateHero,
  createHero,
  deleteHero,
};
