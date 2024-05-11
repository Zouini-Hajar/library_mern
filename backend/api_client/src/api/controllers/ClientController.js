import Client from "../models/Client.js";

export const getAllClients = (req, res) => {
  Client.find()
    .then((clients) => {
      if (clients.length == 0)
        res.status(404).json({ message: "No clients found" });
      else res.status(200).json(clients);
    })
    .catch((err) => res.sendStatus(500));
};

export const getClient = (req, res) => {
  if (!req.params.id) res.status(400).json({ message: "Id is required" });

  Client.findOne({ _id: req.params.id })
    .then((client) => {
      if (!client)
        res.status(404).json({ message: `No client found with id ${req.params.id}` });
      else res.status(200).json(client);
    })
    .catch((err) => res.sendStatus(500));
};

export const addClient = (req, res) => {
  Client.create(req.body)
    .then((client) => res.status(200).json({ message: "Client added successfully", client }))
    .catch((err) => res.sendStatus(500));
};

export const updateClient = (req, res) => {
  Client.findOneAndUpdate({ _id: req.body.id }, { $set: req.body })
    .then((client) => {
      if (!client) 
        res.status(404).json({ message: `No client found matching id ${req.params.id}` });
      else
        res.status(200).json({ message: "Client updated successfully" });
    })
    .catch((err) => res.sendStatus(500));
};

export const deleteClient = (req, res) => {
  if (!req.params.id) res.status(400).json({ message: "Id is required" });

  Client.findOneAndDelete({ _id: req.params.id })
    .then((client) => {
      if (!client)
        res.status(404).json({ message: `No client found matching id ${req.params.id}` });
      else
        res.status(200).json({ message: "Client deleted successfully" });
    })
    .catch((err) => res.sendStatus(500));
};
