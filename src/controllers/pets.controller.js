import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js";
import __dirname from "../utils/index.js";

const getAllPets = async (req, res) => {
  try {
    const pets = await petsService.getAll();
    res.send({ status: "success", payload: pets });
  } catch (error) {
    console.error("❌ Error fetching pets:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const createPet = async (req, res) => {
  try {
    const { name, specie, birthDate } = req.body;
    if (!name || !specie || !birthDate)
      return res.status(400).send({ status: "error", error: "Incomplete values" });

    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const result = await petsService.create(pet);

    res.status(201).send({ status: "success", payload: result });
  } catch (error) {
    console.error("❌ Error creating pet:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const updatePet = async (req, res) => {
  try {
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const updatedPet = await petsService.update(petId, petUpdateBody);

    if (!updatedPet)
      return res.status(404).send({ status: "error", error: "Pet not found" });

    res.send({ status: "success", payload: updatedPet });
  } catch (error) {
    console.error("❌ Error updating pet:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const deletePet = async (req, res) => {
  try {
    const petId = req.params.pid;
    const deletedPet = await petsService.delete(petId);

    if (!deletedPet)
      return res.status(404).send({ status: "error", error: "Pet not found" });

    res.send({ status: "success", payload: deletedPet });
  } catch (error) {
    console.error("❌ Error deleting pet:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const createPetWithImage = async (req, res) => {
  try {
    const file = req.file;
    const { name, specie, birthDate } = req.body;

    if (!name || !specie || !birthDate)
      return res.status(400).send({ status: "error", error: "Incomplete values" });

    const pet = PetDTO.getPetInputFrom({
      name,
      specie,
      birthDate,
      image: `${__dirname}/../public/img/${file.filename}`,
    });

    const result = await petsService.create(pet);
    res.status(201).send({ status: "success", payload: result });
  } catch (error) {
    console.error("❌ Error creating pet with image:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

export default {
  getAllPets,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage,
};
