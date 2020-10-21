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

const sendMessage = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  const { dateId, currentUserId, otherUserId, message, date } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const currentUser = await db.collection("users").findOne({ _id: currentUserId });
    const otherUser = await db.collection("users").findOne({ _id: otherUserId });

    const currentUserQuery = { _id: currentUserId };
    const otherUserQuery = { _id: otherUserId };

    const currentUserNewMessage = {
      $set: {
        Conversations: currentUser.Conversations.push({
          _id: dateId,
          from: currentUserId,
          to: otherUserId,
          message: message,
          date: date,
          status: "sent",
        }),
      },
    };

    const otherUserNewMessage = {
      $set: {
        Conversations: otherUser.Conversations.push({
          _id: dateId,
          from: currentUserId,
          to: otherUserId,
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

    res.status(200).json({ status: 200, success: true, messages: newMessage });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const editMessage = async (req, res) => {
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

const getSuggestions = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db('online-booking-system');

    const suggestions = await db.collection('suggestions').find().toArray();

    res.status(200).json({ status: 200, success: true, suggestions });
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

    const suggestions = await db.collection('suggestions').find().toArray();

    res.status(201).json({ status: 201, success: true, suggestions });
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

    const suggestions = await db.collection('suggestions').find().toArray();

    res.status(201).json({ status: 201, success: true, suggestions });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
}

const postComment = async (req ,res) => {
  const client = await MongoClient(MONGO_URI, options);

  // const { dayId, commentId, comment, author } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const day = await db.collection('classes').findOne({ _id: dayId });

    const query = { _id: dayId };

    const newValue = {
      $set: {
        comments: day.comments.push({ _id: commentId, author, comment, status: 'posted' }),
      },
    };

    const dayNewComment = await db.collection("classes").updateOne(query, newValue);
    assert.equal(1, dayNewComment.matchedCount);
    assert.equal(1, dayNewComment.modifiedCount);

    res.status(200).json({
      status: 200,
      dayId,
      dayNewComment,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
}

const editComment = async (req, res) => {
  const client = await MongoClient(MONGO_URI, option);

  // const { dayId, commentId, newComment, author } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const day = await db.collection('classes').findOne({ _id: dayId });

    const query = { _id: dayId };

    day.comments.map(comment => {
      if (comment._id === commentId) {
        comment.comment = newComment;
        comment.status = 'edited';
      }
      return comment
    })

    const editedValue = {
      $set: {
        comments: day.comments,
      },
    };

    const dayEditedComment = await db.collection("classes").updateOne(query, editedValue);
    assert.equal(1, dayEditedComment.matchedCount);
    assert.equal(1, dayEditedComment.modifiedCount);

    res.status(200).json({
      status: 200,
      dayId,
      dayEditedComment,
    });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
}

const deleteComment = async (req, res) => {
  const client = await MongoClient(MONGO_URI, option);

  // const { dayId, commentId } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const day = await db.collection('classes').findOne({ _id: dayId });

    const query = { _id: dayId };

    day.comments.map(comment => {
      if (comment._id === commentId) {
        comment.comment = '';
        comment.status = 'deleted';
      }
      return comment
    })

    const editedValue = {
      $set: {
        comments: day.comments,
      },
    };

    const dayDeletedComment = await db.collection("classes").updateOne(query, editedValue);
    assert.equal(1, dayDeletedComment.matchedCount);
    assert.equal(1, dayDeletedComment.modifiedCount);

    res.status(200).json({
      status: 200,
      dayId,
      dayDeletedComment,
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
  sendMessage,
  updateClass,
  editMessage,
  deleteMessage,
  getWorkouts,
  getOneWorkout,
  getSuggestions,
  createSuggestion,
  deleteSuggestion,
  postComment,
  editComment,
  deleteComment,
};
