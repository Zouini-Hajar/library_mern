import Client from "../models/Client.js";

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    if (clients.length == 0) 
      res.status(404).json({ message: "No clients found" });
    else 
      res.status(200).json(clients);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getClient = async (req, res) => {
  try {
    if (!req.params.id) 
      return res.status(400).json({ message: "Id is required" });

    const client = await Client.findOne({ _id: req.params.id });
    if (!client)
      res.status(404).json({ message: `No client found with id ${req.params.id}` });
    else 
      res.status(200).json(client);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const addClient = async (req, res) => {
  try {
    const client = Client.create(req.body);
    res.status(200).json({ message: "Client added successfully", client });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const updateClient = async (req, res) => {
  try {
    const client = Client.findOneAndUpdate({ _id: req.body.id }, { $set: req.body });
    if (!client) 
      res.status(404).json({ message: `No client found matching id ${req.params.id}` });
    else
      res.status(200).json({ message: "Client updated successfully" });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const deleteClient = (req, res) => {
  try {
    if (!req.params.id) 
      return res.status(400).json({ message: "Id is required" });

    const client = Client.findOneAndDelete({ _id: req.params.id });
    if (!client)
      res.status(404).json({ message: `No client found matching id ${req.params.id}` });
    else
      res.status(200).json({ message: "Client deleted successfully" });
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
};
