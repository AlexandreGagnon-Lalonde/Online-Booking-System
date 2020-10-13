"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const assert = require("assert");

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const PORT = 3000;

const { uuid } = require("uuidv4");

const { createUser, getUser } = require("./handlers");

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .post("/api/createuser", createUser)
  .get("/api/getuser/:email", getUser)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

const ADMIN = {
  _id: Buffer.from("alexandre.gl@hotmail.ca").toString("base64"),
  firstName: "Alexandre",
  lastName: "Gagnon-Lalonde",
  phone: 1234567890,
  DOB: "01/01/2000",
  gender: "male",
  city: "montreal",
  address: "1234 Wallabee Zoo",
  zipcode: "B4N4N4",
  email: "alexandre.gl@hotmail.ca",
  password: "12341234",
  admin: true,
  "Emergency Contact": {
    relName: "",
    relation: "",
    relPhone: "",
  },
  Conversations: [],
  Classes: [],
};

const importAdmin = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const users = await db.collection("users").find().toArray();
    console.log(users.length);
    if (users.length > 0) {
      res.status(404).json({ status: 404, message: "Already existing users" });
    }

    const userAdmin = await db.collection("users").insertOne(ADMIN);
    assert.equal(1, userAdmin.insertedCount);

    res.status(204).json({ status: 204, message: "Admin Created!" });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

importAdmin();
