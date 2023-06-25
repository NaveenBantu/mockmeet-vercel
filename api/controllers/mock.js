import connectDB from "../config/db.js";
import Mock from "../models/Mock.js";

/**
 * @desc    Create new Mock Type
 * @route   POST /api/mocks
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const createMock = async (req, res, next) => {
  // Connecting to mongoDB
  connectDB();

  const newMock = new Mock(req.body);

  try {
    const savedMock = await newMock.save();
    res.status(200).json(savedMock);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update Mock Type
 * @route   PUT /api/mocks/:id
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const updateMock = async (req, res, next) => {
  // Connecting to mongoDB
  connectDB();

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

/**
 * @desc    Delete Mock Type
 * @route   DELETE /api/mocks/:id
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const deleteMock = async (req, res, next) => {
  // Connecting to mongoDB
  connectDB();

  try {
    const deletedMock = await Mock.findByIdAndDelete(req.params.id);
    res.status(200).json("Mock has been deleted.");
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get a particular Mock Type
 * @route   GET /api/mocks/:id
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getMock = async (req, res, next) => {
  // Connecting to mongoDB
  connectDB();

  try {
    await Mock.findById(req.params.id).then((mock) => {
      res.status(200).json(mock);
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all Mock Interviews
 * @route   GET /api/mocks
 * @access  Public
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getMocks = async (req, res, next) => {
  // Connecting to mongoDB
  // connectDB();

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
