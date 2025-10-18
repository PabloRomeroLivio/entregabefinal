import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/User.dto.js";

const JWT_SECRET = "tokenSecretJWT"; 

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password)
      return res.status(400).send({ status: "error", error: "Incomplete values" });

    const exists = await usersService.getUserByEmail(email);
    if (exists)
      return res.status(400).send({ status: "error", error: "User already exists" });

    const hashedPassword = await createHash(password);
    const userInput = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    };

    const result = await usersService.create(userInput);

    res.status(201).send({ status: "success", payload: { _id: result._id } });
  } catch (error) {
    console.error("❌ Error in register:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ status: "error", error: "Incomplete values" });

    const user = await usersService.getUserByEmail(email);
    if (!user)
      return res.status(404).send({ status: "error", error: "User doesn't exist" });

    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword)
      return res.status(400).send({ status: "error", error: "Incorrect password" });

    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("coderCookie", token, { maxAge: 3600000, httpOnly: true }).send({
      status: "success",
      message: "Logged in",
      payload: userDto,
    });
  } catch (error) {
    console.error("❌ Error in login:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const current = async (req, res) => {
  try {
    const token = req.cookies["coderCookie"];
    if (!token) return res.status(401).send({ status: "error", error: "Not authenticated" });

    const user = jwt.verify(token, JWT_SECRET);
    res.send({ status: "success", payload: user });
  } catch (error) {
    console.error("❌ Error in current:", error);
    res.status(401).send({ status: "error", error: "Invalid token" });
  }
};

const unprotectedLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ status: "error", error: "Incomplete values" });

    const user = await usersService.getUserByEmail(email);
    if (!user)
      return res.status(404).send({ status: "error", error: "User doesn't exist" });

    const isValidPassword = await passwordValidation(user, password);
    if (!isValidPassword)
      return res.status(400).send({ status: "error", error: "Incorrect password" });

    const token = jwt.sign(user.toObject(), JWT_SECRET, { expiresIn: "1h" });

    res.cookie("unprotectedCookie", token, { maxAge: 3600000, httpOnly: true }).send({
      status: "success",
      message: "Unprotected Logged in",
    });
  } catch (error) {
    console.error("❌ Error in unprotectedLogin:", error);
    res.status(500).send({ status: "error", error: "Internal server error" });
  }
};

const unprotectedCurrent = async (req, res) => {
  try {
    const token = req.cookies["unprotectedCookie"];
    if (!token) return res.status(401).send({ status: "error", error: "Not authenticated" });

    const user = jwt.verify(token, JWT_SECRET);
    res.send({ status: "success", payload: user });
  } catch (error) {
    console.error("❌ Error in unprotectedCurrent:", error);
    res.status(401).send({ status: "error", error: "Invalid token" });
  }
};

export default {
  register,
  login,
  current,
  unprotectedLogin,
  unprotectedCurrent,
};
