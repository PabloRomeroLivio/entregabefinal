import { usersService, petsService, adoptionsService } from "../services/index.js";

const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await adoptionsService.getAll();
    
    const payload = adoptions.map(a => ({
      _id: a._id,
      user: a.owner,
      pet: a.pet,
      date: a.date,
      createdAt: a.createdAt,
      updatedAt: a.updatedAt,
    }));
    res.send({ status: "success", payload });
  } catch (error) {
    console.error("❌ Error fetching adoptions:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const getAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    const adoption = await adoptionsService.getById(aid);
    if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });

    const payload = {
      _id: adoption._id,
      user: adoption.owner,
      pet: adoption.pet,
      date: adoption.date,
      createdAt: adoption.createdAt,
      updatedAt: adoption.updatedAt,
    };

    res.send({ status: "success", payload });
  } catch (error) {
    console.error("❌ Error fetching adoption:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.params;

    const user = await usersService.getUserById(uid);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" });

    const pet = await petsService.getPetById(pid);
    if (!pet) return res.status(404).send({ status: "error", error: "Pet not found" });

    const adoption = await adoptionsService.create({
      owner: uid, 
      pet: pid,
      date: new Date(),
    });

    await petsService.update(pid, { adopted: true, owner: uid });

    
    const payload = {
      _id: adoption._id,
      user: adoption.owner,
      pet: adoption.pet,
      date: adoption.date,
      createdAt: adoption.createdAt,
      updatedAt: adoption.updatedAt,
    };

    res.status(201).send({ status: "success", payload });
  } catch (error) {
    console.error("❌ Error creating adoption:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const deleteAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    const adoption = await adoptionsService.getById(aid);
    if (!adoption) return res.status(404).send({ status: "error", error: "Adoption not found" });

    await petsService.update(adoption.pet, { adopted: false, owner: null });
    await adoptionsService.delete(aid);

    res.send({ status: "success", message: "Adoption deleted" });
  } catch (error) {
    console.error("❌ Error deleting adoption:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

export default {
  getAllAdoptions,
  getAdoption,
  createAdoption,
  deleteAdoption,
};
