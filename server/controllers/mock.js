import Interviewer from "../models/Interviewer.js";
import Mock from "../models/Mock.js";

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
    const mocks = await Mock.findById(req.params.id);
    res.status(200).json(mocks);
  } catch (err) {
    next(err);
  }
};

// Get all Mock Interviews
export const getMocks = async (req, res, next) => {
  try {
    const mocks = await Mock.find();
    res.status(200).json(mocks);
  } catch (err) {
    next(err);
  }
};

// Get Mock Interviewers
export const getMockInterviewers = async (req, res, next) => {
  try {
    const mock = await Mock.findById(req.params.id);
    const list = await Promise.all(
      mock.interviewers.map((interviewer) => {
        return Interviewer.findById(interviewer);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
