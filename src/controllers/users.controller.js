import { usersService, petsService, adoptionsService } from "../services/index.js";


const getAllAdoptions = async (req, res) => {
  try {
    const adoptions = await adoptionsService.getAll();
    res.send({ status: "success", payload: adoptions });
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
    res.send({ status: "success", payload: adoption });
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
      user: uid,
      pet: pid,
      date: new Date(),
    });


    await petsService.update(pid, { adopted: true, owner: uid });

    res.status(201).send({ status: "success", payload: adoption });
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
