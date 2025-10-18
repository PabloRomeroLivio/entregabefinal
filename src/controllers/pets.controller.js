import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js";
import __dirname from "../utils/index.js";

const getAllPets = async (req, res) => {
  try {
    const pets = await petsService.getAll();

    
    const payload = pets.map(p => ({
      _id: p._id,
      name: p.name,
      specie: p.specie,
      birthDate: p.birthDate,
      adopted: p.adopted,
      owner: p.owner || null,
      image: p.image || null,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }));

    res.send({ status: "success", payload });
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

    const payload = {
      _id: result._id,
      name: result.name,
      specie: result.specie,
      birthDate: result.birthDate,
      adopted: result.adopted,
      owner: result.owner || null,
      image: result.image || null,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    res.status(201).send({ status: "success", payload });
  } catch (error) {
    console.error("❌ Error creating pet:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const updatePet = async (req, res) => {
  try {
    const petId = req.params.pid;
    const petUpdateBody = req.body;
    const updatedPet = await petsService.update(petId, petUpdateBody);

    if (!updatedPet)
      return res.status(404).send({ status: "error", error: "Pet not found" });

    const payload = {
      _id: updatedPet._id,
      name: updatedPet.name,
      specie: updatedPet.specie,
      birthDate: updatedPet.birthDate,
      adopted: updatedPet.adopted,
      owner: updatedPet.owner || null,
      image: updatedPet.image || null,
      createdAt: updatedPet.createdAt,
      updatedAt: updatedPet.updatedAt,
    };

    res.send({ status: "success", payload });
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

    const payload = {
      _id: deletedPet._id,
      name: deletedPet.name,
      specie: deletedPet.specie,
      birthDate: deletedPet.birthDate,
      adopted: deletedPet.adopted,
      owner: deletedPet.owner || null,
      image: deletedPet.image || null,
      createdAt: deletedPet.createdAt,
      updatedAt: deletedPet.updatedAt,
    };

    res.send({ status: "success", payload });
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

    const payload = {
      _id: result._id,
      name: result.name,
      specie: result.specie,
      birthDate: result.birthDate,
      adopted: result.adopted,
      owner: result.owner || null,
      image: result.image || null,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };

    res.status(201).send({ status: "success", payload });
  } catch (error) {
    console.error("❌ Error creating pet with image:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const getPetById = async (req, res) => {
  try {
    const petId = req.params.pid;
    const pet = await petsService.getPetById(petId);

    if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });

    const payload = {
      _id: pet._id,
      name: pet.name,
      specie: pet.specie,
      birthDate: pet.birthDate,
      adopted: pet.adopted,
      owner: pet.owner || null,
      image: pet.image || null,
      createdAt: pet.createdAt,
      updatedAt: pet.updatedAt,
    };

    res.send({ status: "success", payload }); 
  } catch (error) {
    console.error("❌ Error fetching pet by id:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};


export default {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage,
};
