import UserRepository from "../repository/UserRepository.js";
import UsersDao from "../dao/Users.dao.js";

const userRepo = new UserRepository(new UsersDao());

const mapUserPayload = (user) => ({
  _id: user._id,
  first_name: user.first_name, 
  last_name: user.last_name,
  email: user.email,
  age: user.age || null,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  password: user.password, 
});

const getAllUsers = async (req, res) => {
  try {
    const users = await userRepo.getAllUsers();
    const payload = users.map(mapUserPayload);
    res.send({ status: "success", payload });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userRepo.getUserById(uid);
    if (!user) return res.status(404).send({ status: "error", error: "User not found" });

    const payload = mapUserPayload(user);
    res.send({ status: "success", payload });
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await userRepo.createUser(req.body);
    const payload = mapUserPayload(newUser);
    res.status(201).send({ status: "success", payload });
  } catch (error) {
    console.error("❌ Error creating user:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const updatedUser = await userRepo.updateUser(uid, req.body);
    if (!updatedUser) return res.status(404).send({ status: "error", error: "User not found" });

    const payload = mapUserPayload(updatedUser);
    res.send({ status: "success", payload });
  } catch (error) {
    console.error("❌ Error updating user:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const deletedUser = await userRepo.deleteUser(uid);
    if (!deletedUser) return res.status(404).send({ status: "error", error: "User not found" });

    res.send({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

export default {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
