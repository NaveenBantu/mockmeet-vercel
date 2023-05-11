import Interviewer from "../models/Interviewer.js";
import Mock from "../models/Mock.js";
import { clients, sessions } from "@clerk/clerk-sdk-node";
import Cookies from "cookies";

// Creating Mock Interview Type
export const createMock = async (req, res, next) => {
  const newMock = new Mock(req.body);

  try {
    const savedMock = await newMock.save();
    res.status(200).json(savedMock);
  } catch (err) {
    next(err);
  }
};

// Updating Mock interview
export const updateMock = async (req, res, next) => {
  try {
    const updatedMock = await Mock.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedMock);
  } catch (err) {
    next(err);
  }
};

// Deleting Mock interview
export const deleteMock = async (req, res, next) => {
  try {
    const deletedMock = await Mock.findByIdAndDelete(req.params.id);
    res.status(200).json("Mock has been deleted.");
  } catch (err) {
    next(err);
  }
};

// Get a particular Mock Interviews
export const getMock = async (req, res, next) => {
  try {
    await Mock.findById(req.params.id)
      .populate("interviewers")
      .then((mock) => {
        res.status(200).json(mock);
      });
  } catch (err) {
    next(err);
  }
};

// Get all Mock Interviews
export const getMocks = async (req, res, next) => {
  try {
    // Retrieve the particular session ID from a
    // query string parameter
    const sessionId = req.query._clerk_session_id;
    console.log("mock session id ", sessionId);

    // Note: Clerk stores the clientToken in a cookie
    // named "__session" for Firebase compatibility
    const cookies = new Cookies(req, res);
    const clientToken = cookies.get("__session");
    console.log("client tocken", clientToken);

    // const session = await sessions.verifySession(sessionId, clientToken);

    // console.log(session);

    // const client = await clients.verifyClient(sessionToken);
    // const sessionId = client.lastActiveSessionId;

    Mock.find()
      .populate("interviewers")
      .then((mocks) => {
        res.status(200).json(mocks);
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
};
