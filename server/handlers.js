"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const assert = require("assert");
const moment = require("moment");

const createUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const users = await db.collection("users").find().toArray();

    const userExist = users.find((user) => user.email === req.body.email);

    if (userExist) {
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

    const user = await db.collection("users").findOne({ email });

    if (user) {
      res.status(200).json({ status: 200, user });
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

    const conversations = await db.collection("conversations").find().toArray();

    const conversationExist = conversations.find(
      (convo) =>
        (convo.user1 === currentUserId || otherUserId) &&
        (convo.user2 === currentUserId || otherUserId)
    );

    const newMessage = {
      from: currentUserId,
      message,
      status: "sent",
    };

    if (conversationExist) {
      conversationExist.messages.push(newMessage);
      const newMessages = conversationExist.messages;

      const conversationQuery = { _id: conversationExist._id };

      const conversationModification = {
        $set: {
          messages: newMessages,
        },
      };

      const conversationEdited = await db
        .collection("conversations")
        .updateOne(conversationQuery, conversationModification);
      assert.equal(1, conversationEdited.matchedCount);
      assert.equal(1, conversationEdited.modifiedCount);
    } else {
      const currentUser = await db
        .collection("users")
        .findOne({ _id: currentUserId });
      const otherUser = await db
        .collection("users")
        .findOne({ _id: otherUserId });

      const currentUserQuery = { _id: currentUserId };
      const otherUserQuery = { _id: otherUserId };

      const conversationId = currentUserId + otherUserId;

      currentUser.conversations.push(conversationId);
      otherUser.conversations.push(conversationId);
      const currentUserConversations = currentUser.conversations;
      const otherUserConversations = otherUser.conversations;

      const currentUserConversationsModification = {
        $set: {
          conversations: currentUserConversations,
        },
      };
      const otherUserConversationsModification = {
        $set: {
          conversations: otherUserConversations,
        },
      };

      const currentUserUpdated = await db
        .collection("users")
        .updateOne(currentUserQuery, currentUserConversationsModification);
      assert.equal(1, currentUserUpdated.matchedCount);
      assert.equal(1, currentUserUpdated.modifiedCount);

      const otherUserUpdated = await db
        .collection("users")
        .updateOne(otherUserQuery, otherUserConversationsModification);
      assert.equal(1, otherUserUpdated.matchedCount);
      assert.equal(1, otherUserUpdated.modifiedCount);

      const newConversationData = {
        _id: conversationId,
        user1: currentUserId,
        user2: otherUserId,
        messages: [newMessage],
      };

      const newConversation = await db
        .collection("conversations")
        .insertOne(newConversationData);
      assert(1, newConversation.insertedCount);
    }

    res.status(200).json({ status: 200, success: true, messages: req.body });
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
        conversations: currentUserNewConversations,
      },
    };

    const otherUserNewMessage = {
      $set: {
        conversations: otherUserNewConversations,
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
        conversations: currentUserNewConversations,
      },
    };

    const otherUserNewMessage = {
      $set: {
        conversations: otherUserNewConversations,
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

const getMessages = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  const { _id } = req.params;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const conversations = await db.collection("conversations").find().toArray();

    const userConversations = conversations.filter(
      (conversation) => conversation.user1 === _id || conversation.user2 === _id
    );

    res.status(200).json({ status: 200, message: userConversations });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const bookClass = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  const { classId } = req.params;
  const { newClass, classTime, currentUser } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const classQuery = { _id: classId };
    const userQuery = { _id: currentUser._id };

    const classes = await db.collection("classes").find().toArray();
    const users = await db.collection("users").find().toArray();

    const classExist = classes.find((classe) => classe._id === classId);

    const userClasses = users.find((user) => user._id === currentUser._id)
      .classes;

    let isCurrentUserInClass;

    if (classExist && classes.length > 0) {
      isCurrentUserInClass = classes
        .find((classe) => classe._id === classId)
        [classTime].find((user) => user._id === currentUser._id);
    }

    if (classExist && !isCurrentUserInClass) {
      let currentClass;
      // update class data
      classes.forEach((classe) => {
        if (classe._id === classId) {
          classe[classTime].push({
            _id: currentUser._id,
            fullname: currentUser.firstName + " " + currentUser.lastName,
            email: currentUser.email,
          });
          currentClass = {
            $set: {
              [classTime]: classe[classTime],
            },
          };
        }
      });

      const classEdited = await db
        .collection("classes")
        .updateOne(classQuery, currentClass);
      assert.equal(1, classEdited.matchedCount);
      assert.equal(1, classEdited.modifiedCount);

      const currentUserHasClass = userClasses.find(
        (classe) => classe === classId
      );

      if (!currentUserHasClass) {
        userClasses.push(classId);

        const newUserClass = {
          $set: {
            classes: userClasses,
          },
        };

        const userEdited = await db
          .collection("users")
          .updateOne(userQuery, newUserClass);
        assert.equal(1, userEdited.matchedCount);
        assert.equal(1, userEdited.modifiedCount);
      }

      const userEditedData = users.find((user) => user._id === currentUser._id);

      res.status(201).json({
        status: 201,
        message: "Class created, user edited",
        calendar: currentClass,
        user: userEditedData,
      });
    } else if (!classExist) {
      const firstClass = await db.collection("classes").insertOne(newClass);
      assert(1, firstClass.insertedCount);

      const currentUserHasClass = userClasses.find(
        (classe) => classe === classId
      );

      if (!currentUserHasClass) {
        userClasses.push(classId);

        const newUserClass = {
          $set: {
            classes: userClasses,
          },
        };

        const userEdited = await db
          .collection("users")
          .updateOne(userQuery, newUserClass);
        assert.equal(1, userEdited.matchedCount);
        assert.equal(1, userEdited.modifiedCount);
      }

      const userEditedData = users.find((user) => user._id === currentUser._id);

      res.status(201).json({
        status: 201,
        message: "Class updated",
        calendar: newClass,
        user: userEditedData,
      });
    } else {
      res
        .status(500)
        .json({ status: 500, message: "You are already in that class!" });
    }
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const unbookClass = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  const { currentUserId, classTime } = req.body;
  const { classId } = req.params;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const currentUser = await db
      .collection("users")
      .findOne({ _id: currentUserId });
    const selectedClass = await db
      .collection("classes")
      .findOne({ _id: classId });

    const updatedSelectedClass = selectedClass[classTime].filter(
      (member) => member._id !== currentUserId
    );
    const updatedCurrentUserClasses = currentUser.classes.filter(
      (classe) => classe !== classId
    );

    const userQuery = { _id: currentUserId };
    const classQuery = { _id: classId };

    const userValue = {
      $set: {
        classes: updatedCurrentUserClasses,
      },
    };
    const classValue = {
      $set: {
        [classTime]: updatedSelectedClass,
      },
    };

    const userEdited = await db
      .collection("users")
      .updateOne(userQuery, userValue);
    assert.equal(1, userEdited.matchedCount);
    assert.equal(1, userEdited.modifiedCount);

    const classEdited = await db
      .collection("classes")
      .updateOne(classQuery, classValue);
    assert.equal(1, classEdited.matchedCount);
    assert.equal(1, classEdited.modifiedCount);

    res.status(200).json({ status: 200, userEdited, classEdited });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const getCalendar = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  const { calendarDisplay, firstDay } = req.params;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const classes = await db.collection("classes").find().toArray();

    const encryptedOneDay = Buffer.from(
      firstDay.toString().slice(0, 15)
    ).toString("base64");

    let passedToFrontEndClasses = [];

    if (calendarDisplay === "timeGridWeek") {
      for (let i = 1; i <= 7; i++) {
        const classStringComparison = classes.find(
          (classe) =>
            classe._id ===
            Buffer.from(
              moment(new Date(firstDay))
                .day(i)
                .format("ddd MMM DD YYYY")
                .toString()
            ).toString("base64")
        );

        if (classStringComparison) {
          passedToFrontEndClasses.push(classStringComparison);
        }
      }
    } else if (calendarDisplay === "timeGridDay") {
      // push the class with the correct _id to the array
      passedToFrontEndClasses =
        classes.find((classe) => classe._id === encryptedOneDay) || [];
    } else {
      res.status(404).json({ status: 404, message: "Invalid request" });
    }

    res.status(200).json({
      status: 200,
      message: "Day received",
      calendar: passedToFrontEndClasses,
    });
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

const getOneWorkout = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  // const { workoutId } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

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
};

const getSuggestions = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const suggestions = await db.collection("suggestions").find().toArray();

    res.status(200).json({ status: 200, success: true, suggestions });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const createSuggestion = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const newSuggestion = await db
      .collection("suggestions")
      .insertOne(req.body);
    assert.equal(1, newSuggestion.insertedCount);

    const suggestions = await db.collection("suggestions").find().toArray();

    res.status(201).json({ status: 201, success: true, suggestions });
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const deleteSuggestion = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  const { id } = req.params;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const deletedSuggestion = await db
      .collection("suggestions")
      .deleteOne({ _id: id });
    assert.equal(1, deletedSuggestion.deletedCount);

    const suggestions = await db.collection("suggestions").find().toArray();

    res.status(201).json({ status: 201, success: true, suggestions });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

const postComment = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  // const { dayId, commentId, comment, author } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const day = await db.collection("classes").findOne({ _id: dayId });

    const query = { _id: dayId };

    const newValue = {
      $set: {
        comments: day.comments.push({
          _id: commentId,
          author,
          comment,
          status: "posted",
        }),
      },
    };

    const dayNewComment = await db
      .collection("classes")
      .updateOne(query, newValue);
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
};

const editComment = async (req, res) => {
  const client = await MongoClient(MONGO_URI, option);

  // const { dayId, commentId, newComment, author } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const day = await db.collection("classes").findOne({ _id: dayId });

    const query = { _id: dayId };

    day.comments.map((comment) => {
      if (comment._id === commentId) {
        comment.comment = newComment;
        comment.status = "edited";
      }
      return comment;
    });

    const editedValue = {
      $set: {
        comments: day.comments,
      },
    };

    const dayEditedComment = await db
      .collection("classes")
      .updateOne(query, editedValue);
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
};

const deleteComment = async (req, res) => {
  const client = await MongoClient(MONGO_URI, option);

  // const { dayId, commentId } = req.body;
  try {
    await client.connect();

    const db = client.db("online-booking-system");

    const day = await db.collection("classes").findOne({ _id: dayId });

    const query = { _id: dayId };

    day.comments.map((comment) => {
      if (comment._id === commentId) {
        comment.comment = "";
        comment.status = "deleted";
      }
      return comment;
    });

    const editedValue = {
      $set: {
        comments: day.comments,
      },
    };

    const dayDeletedComment = await db
      .collection("classes")
      .updateOne(query, editedValue);
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
};

module.exports = {
  createUser,
  getUser,
  updateUser,
  sendMessage,
  editMessage,
  deleteMessage,
  getMessages,
  getWorkouts,
  getOneWorkout,
  getSuggestions,
  createSuggestion,
  deleteSuggestion,
  postComment,
  editComment,
  deleteComment,
  bookClass,
  unbookClass,
  getCalendar,
};
