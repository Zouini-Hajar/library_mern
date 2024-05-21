import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const generateAccessToken = (userInfo) => {
  return jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3600s", // 30 mins
  });
};

const generateRefreshToken = (userInfo) => {
  return jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET);
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length == 0) res.status(404).json({ message: "No users found" });
    else res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const register = async (req, res) => {
  try {
    const { email, role, password } = req.body;

    // Check if a user exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await User.create({
      email,
      role,
      password: hashedPassword,
    });
    return res.status(200).json({
      message: "User created successfully",
      user: createdUser,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Generate access and refresh tokens
      const userInfo = { email: user.email, role: user.role };
      const accessToken = generateAccessToken(userInfo);
      const refreshToken = generateRefreshToken(userInfo);
      return res.status(200).json({
        message: "User logged in successfully",
        user: { ...userInfo },
        accessToken,
        refreshToken,
      });
    } else {
      return res.status(401).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      user.save();

      return res.status(200).json({
        message: "Password updated successfully",
        user,
      });
    } else {
      return res.status(401).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const resetEmail = async (req, res) => {
  try {
    const { email, newEmail } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.email = newEmail;
    user.save();

    res.status(200).json({
      message: "Email updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!req.params.email)
      return res.status(400).json({ message: "Email required" });

    const user = await User.findOneAndDelete({ email: req.params.email });
    if (!user)
      res
        .status(404)
        .json({ message: `No user found with email ${req.params.email}` });
    else res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const refreshToken = async (req, res) => {
  try {
    // In the client side the refresh token is gonna be stored in a cookie
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      else {
        const userInfo = { email: user.email, role: user.role };
        const accessToken = generateAccessToken(userInfo);
        const refreshToken = generateRefreshToken(userInfo);
        return res.status(200).json({ accessToken, refreshToken });
      }
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const validateJWT = async (req, res) => {
  try {
    const token = req.body.token;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      else return res.status(200).json(user);
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
