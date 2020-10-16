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

    if (users.filter((user) => user.email === req.body.email).length === 1) {
      res.status(404).json({ status: 404, message: "Email Already in Use" });
    }
    console.log("createuser 24");
    const newUser = await db.collection("users").insertOne(req.body);
    assert(1, newUser.insertedCount);

    res.status(201).json({ status: 201, success: true, user: req.body });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { email } = req.params;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const user = await db.collection("users").findOne({ email: email });

    if (user) {
      res.status(200).json({ status: 200, lang: email, user: user });
    } else {
      res.status(404).json({ status: 404, message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const updateUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  // const { userId, field, updatedField } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const query = { _id: userId };

    const newValue = {
      $set: {
        [field]: updatedField,
      },
    };

    const user = await db.collection("users").updateOne(query, newValue);
    assert.equal(1, user.matchedCount);
    assert.equal(1, user.modifiedCount);

    res.status(200).json({
      status: 200,
      _id: userId,
      message: updatedField,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const createMessage = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  // const { _id, userId, message, date } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const user = await db.collection("users").findOne({ _id: _id });

    const query = { _id: userId };

    const newMessage = {
      $set: {
        Conversations: user.Conversations.push({
          from: _id,
          to: userId,
          message: message,
          date: date,
          status: "sent",
        }),
      },
    };

    const messageCreated = await db
      .collection("users")
      .updateOne(query, newMessage);
    assert.equal(1, messageCreated.matchedCount);
    assert.equal(1, messageCreated.modifiedCount);

    res.status(200).json({ status: 200, success: true, message: message });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const deleteMessage = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("online-booking-system");
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const updateMessage = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("online-booking-system");
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const updateClass = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("online-booking-system");
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  createMessage,
  updateClass,
  updateMessage,
  deleteMessage,
};
