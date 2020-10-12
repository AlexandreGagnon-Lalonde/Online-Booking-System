"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const assert = require("assert");

const createUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const users = await db.collection("users").find().toArray();

    if (users.filter(user => user.email === req.body.email).length === 1) {
      res.status(404).json({ status: 404, message: 'Email Already in Use' })
    }

    const newUser = await db.collection('users').insertOne(req.body)
    assert(1, newUser.insertedCount)

    res.status(201), json({ status: 201, success: true, data: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const getUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  const email = req.params;
  try {
    await client.connect();

    const db = client.db('online-booking-system');

    const users = await db.collection('users').findOne({ email: email }, (err, result) => {
      result
        ? res.status(200).json({ status: 200, lang: email, user: result })
        : res.status(404).json({ status: 404, user: "User not found" });
    })
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
}

module.exports = { createUser, getUser };
