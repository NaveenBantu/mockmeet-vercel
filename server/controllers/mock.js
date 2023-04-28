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
  // code here
};

// Deleting Mock interview
export const deleteMock = async (req, res, next) => {
  // code here
};

// Get all Mock Interviews
export const getMocks = async (req, res, next) => {};
