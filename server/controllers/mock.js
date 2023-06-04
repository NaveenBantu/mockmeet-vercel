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
    await Mock.findById(req.params.id).then((mock) => {
      res.status(200).json(mock);
    });
  } catch (err) {
    next(err);
  }
};

// Get all Mock Interviews
export const getMocks = async (req, res, next) => {
  try {
    Mock.find()
      .sort({ level: 1 })
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
