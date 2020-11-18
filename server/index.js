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
const cors = require("cors");

const PORT = 1234;

const {
  createUser,
  getUser,
  updateUser,
  getAllWorkouts,
  getWorkout,
  postWorkout,
  getSuggestions,
  deleteSuggestion,
  createSuggestion,
  getComments,
  postComment,
  editComment,
  deleteComment,
  sendMessage,
  editMessage,
  deleteMessage,
  getMessages,
  bookClass,
  unbookClass,
  getCalendar,
} = require("./handlers");

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
    res.header("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  // REST endpoints?
  .get("/api/getuser/:email", getUser)
  .get("/api/getworkout", getWorkout)
  .get("/api/getallworkouts", getAllWorkouts)
  .get("/api/getsuggestions", getSuggestions)
  .get("/api/getcalendar/:calendarDisplay/:firstDay", getCalendar)
  .get("/api/getmessages/:_id", getMessages)
  .get("/api/getcomments", getComments)

  .post("/api/createuser", createUser)
  .post("/api/createsuggestion", createSuggestion)

  .patch("/api/postcomment", postComment)
  .patch("/api/editcomment", editComment)
  .patch("/api/deletecomment", deleteComment)
  .patch("/api/sendmessage", sendMessage)
  .patch("/api/editmessage", editMessage)
  .patch("/api/deletemessage", deleteMessage)
  .patch("/api/updateuser/:param/:value", updateUser)
  .patch("/api/bookclass/:classId", bookClass)
  .patch("/api/unbookclass/:classId", unbookClass)
  .patch('/api/postworkout', postWorkout)

  .delete("/api/suggestion/delete/:id", deleteSuggestion)

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
  conversations: [],
  classes: [],
};

const importAdmin = async () => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const userAdmin = await db.collection("users").insertOne(ADMIN);
    assert.equal(1, userAdmin.insertedCount);

    console.log("success");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
};

// importAdmin();
