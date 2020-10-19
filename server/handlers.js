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

    const newUser = await db.collection("users").insertOne(req.body);
    assert(1, newUser.insertedCount);

    res.status(201).json({ status: 201, success: true, user: req.body });
  } catch (err) {
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

    const currentUser = await db.collection("users").findOne({ _id: _id });
    const otherUser = await db.collection("users").findOne({ _id: userId });

    const currentUserQuery = { _id: _id };
    const otherUserQuery = { _id: userId };

    const currentUserNewMessage = {
      $set: {
        Conversations: currentUser.Conversations.push({
          _id: Buffer.from(date).toString("base64"),
          from: _id,
          to: userId,
          message: message,
          date: date,
          status: "sent",
        }),
      },
    };

    const otherUserNewMessage = {
      $set: {
        Conversations: otherUser.Conversations.push({
          _id: Buffer.from(date).toString("base64"),
          from: _id,
          to: userId,
          message: message,
          date: date,
          status: "sent",
        }),
      },
    };

    const currentUserMessageCreated = await db
      .collection("users")
      .updateOne(currentUserQuery, currentUserNewMessage);
    assert.equal(1, currentUserMessageCreated.matchedCount);
    assert.equal(1, currentUserMessageCreated.modifiedCount);

    const otherUserMessageCreated = await db
      .collection("users")
      .updateOne(otherUserQuery, otherUserNewMessage);
    assert.equal(1, otherUserMessageCreated.matchedCount);
    assert.equal(1, otherUserMessageCreated.modifiedCount);

    res.status(200).json({ status: 200, success: true, message: newMessage });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const updateMessage = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  // const { messageContent, messageId, _id, userId } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const currentUser = await db.collection("users").findOne({ _id });
    const otherUser = await db.collection("users").findOne({ _id: userId });

    const currentUserQuery = { _id };
    const otherUserQuery = { _id: userId };

    const currentUserNewConversations = currentUser.Conversations.map(
      (message) => {
        if (message._id === messageId) {
          return {
            _id: messageId,
            from: message.from,
            to: message.to,
            message: messageContent,
            date: message.date,
            status: "edited",
          };
        } else {
          return message;
        }
      }
    );

    const otherUserNewConversations = otherUser.Conversations.map((message) => {
      if (message._id === messageId) {
        return {
          _id: messageId,
          from: message.from,
          to: message.to,
          message: messageContent,
          date: message.date,
          status: "edited",
        };
      } else {
        return message;
      }
    });

    const currentUserNewMessage = {
      $set: {
        Conversations: currentUserNewConversations,
      },
    };

    const otherUserNewMessage = {
      $set: {
        Conversations: otherUserNewConversations,
      },
    };

    const currentUserMessageCreated = await db
      .collection("users")
      .updateOne(currentUserQuery, currentUserNewMessage);
    assert.equal(1, currentUserMessageCreated.matchedCount);
    assert.equal(1, currentUserMessageCreated.modifiedCount);

    const otherUserMessageCreated = await db
      .collection("users")
      .updateOne(otherUserQuery, otherUserNewMessage);
    assert.equal(1, otherUserMessageCreated.matchedCount);
    assert.equal(1, otherUserMessageCreated.modifiedCount);

    res.status(200).json({ status: 200, success: true, message: newMessage });
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

    const currentUser = await db.collection("users").findOne({ _id: _id });
    const otherUser = await db.collection("users").findOne({ _id: userId });

    const currentUserQuery = { _id: _id };
    const otherUserQuery = { _id: userId };

    const currentUserNewConversations = currentUser.Conversations.map(
      (message) => {
        if (message._id === messageId) {
          return {
            _id: messageId,
            from: message.from,
            to: message.to,
            message: "",
            date: message.date,
            status: "deleted",
          };
        } else {
          return message;
        }
      }
    );

    const otherUserNewConversations = otherUser.Conversations.map((message) => {
      if (message._id === messageId) {
        return {
          _id: messageId,
          from: message.from,
          to: message.to,
          message: "",
          date: message.date,
          status: "deleted",
        };
      } else {
        return message;
      }
    });

    const currentUserNewMessage = {
      $set: {
        Conversations: currentUserNewConversations,
      },
    };

    const otherUserNewMessage = {
      $set: {
        Conversations: otherUserNewConversations,
      },
    };

    const currentUserMessageCreated = await db
      .collection("users")
      .updateOne(currentUserQuery, currentUserNewMessage);
    assert.equal(1, currentUserMessageCreated.matchedCount);
    assert.equal(1, currentUserMessageCreated.modifiedCount);

    const otherUserMessageCreated = await db
      .collection("users")
      .updateOne(otherUserQuery, otherUserNewMessage);
    assert.equal(1, otherUserMessageCreated.matchedCount);
    assert.equal(1, otherUserMessageCreated.modifiedCount);

    res.status(200).json({ status: 200, success: true, message: newMessage });
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

const getWorkouts = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const classes = await db.collection("classes").find().toArray();

    const workouts = classes.map((classe) => {
      return classe.workout;
    });

    workouts.length > 0
      ? res.status(200).json({ status: 200, workouts: workouts })
      : res.status(404).json({ status: 404, message: "No workouts" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const getOneWorkout = async (req ,res) => {
  const client = new MongoClient(MONGO_URI, options);

  // const { workoutId } = req.body;
  try {
    await client.connect();

    const db = client.db('online-booking-system');

    const classes = await db.collection("classes").find().toArray();

    const workout = classes.map((classe) => {
      return classe._id === workoutId;
    });

    workouts.length > 0
      ? res.status(200).json({ status: 200, workout: workout })
      : res.status(404).json({ status: 404, message: "No workouts" });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
}

const createSuggestion = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db('online-booking-system');

    const newSuggestion = await db.collection('suggestions').insertOne(req.body);
    assert.equal(1, newSuggestion.insertedCount);

    res.status(201).json({ status: 201, success: true, suggestion: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
}

const deleteSuggestion = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  const { _id } = req.body;
  try {
    await client.connect();

    const db = client.db('online-booking-system');

    const deletedSuggestion = await db.collection('suggestions').deleteOne({ _id });
    assert.equal(1, deletedSuggestion.deletedCount);

    res.status(201).json({ status: 201, success: true, suggestion: req.body });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
}

const postComment = async (req ,res) => {
  const client = await MongoClient(MONGO_URI, options);

  // const { userId, commentId, comment, author } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const user = await db.collection('classes').findOne({ userId });

    const query = { userId };

    const newValue = {
      $set: {
        comments: user.comments.push({ _id: commentId, author, comment }),
      },
    };

    const userNewComment = await db.collection("users").updateOne(query, newValue);
    assert.equal(1, userNewComment.matchedCount);
    assert.equal(1, userNewComment.modifiedCount);

    res.status(200).json({
      status: 200,
      userId,
      userNewComment,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
}


module.exports = {
  createUser,
  getUser,
  updateUser,
  createMessage,
  updateClass,
  updateMessage,
  deleteMessage,
  getWorkouts,
  getOneWorkout,
  createSuggestion,
  deleteSuggestion,
  postComment
};
