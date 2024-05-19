import Client from "../models/Client.js";
import { configDotenv } from "dotenv";
import axios from "axios";

configDotenv();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    if (clients.length == 0)
      res.status(404).json({ message: "No clients found" });
    else res.status(200).json(clients);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getClientById = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "Id is required" });

    const client = await Client.findOne({ _id: req.params.id });
    if (!client)
      res
        .status(404)
        .json({ message: `No client found with id ${req.params.id}` });
    else res.status(200).json(client);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getClientByEmail = async (req, res) => {
  try {
    if (!req.params.email)
      return res.status(400).json({ message: "Email is required" });

    const client = await Client.findOne({ email: req.params.email });
    if (!client)
      res
        .status(404)
        .json({ message: `No client found with email ${req.params.email}` });
    else res.status(200).json(client);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const addClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Communicate with Auth service to register new user
    await axios.post(`${AUTH_SERVICE_URL}/register`, {
      email,
      role: "client",
      password,
    });

    const client = await Client.create(req.body);
    res.status(200).json({ message: "Client added successfully", client });
  } catch (error) {
    if (error.response && error.response.status === 409) {
      res.status(409).json({ message: "Client already exists" });
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id, email: newEmail } = req.body;

    const client = await Client.findById(id);
    if (!client) {
      return res
        .status(404)
        .json({ message: `No client found matching id ${id}` });
    }

    if (newEmail) {
      const { email } = client;

      // Communicate with Auth service to reset email
      await axios.put(`${AUTH_SERVICE_URL}/resetEmail`, { email, newEmail });
    }

    const updatedClient = await Client.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Client updated successfully", client: updatedClient });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteClient = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ message: "Id is required" });

    const client = await Client.findOneAndDelete({ _id: req.params.id });
    if (!client)
      res
        .status(404)
        .json({ message: `No client found matching id ${req.params.id}` });
    else {
      // Communicate with Auth service to delete user
      await axios.delete(`${AUTH_SERVICE_URL}/delete/${client.email}`);
      res.status(200).json({ message: "Client deleted successfully" });
    }
  } catch (error) {
    if (error.response && error.response.status !== 500) {
      res.sendStatus(error.response.status);
    } else {
      console.log(error);
      res.sendStatus(500);
    }
  }
};
