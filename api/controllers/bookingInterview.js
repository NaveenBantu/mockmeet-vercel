import connectDB from "../config/db.js";
import Interview from "../models/Bookinginterview.js";
import User from "../models/User.js";

/**
 * @desc    Create new Interview
 * @route   POST /api/bookinginterviews
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const createInterview = async (req, res, next) => {
  // Connecting to mongoDB
  connectDB();

  const { student_id, ...restDetails } = req.body;

  // When the Student schedules an Interview,
  // the clerk id passed should be found in the User collection and the Document ID has to be added in the Interview
  const student = await User.find({ clerk_id: student_id }).select("_id");

  const interviewDetails = {
    ...restDetails,
    student: student[0]._id.toString(),
  };

  const newInterview = new Interview(interviewDetails);

  // Saving the interview
  try {
    const savedInterview = await newInterview.save();
    // Delete the booked date from interviewer available dates
    try {
      await User.findOneAndUpdate(
        { _id: savedInterview.interviewer },
        {
          $pull: { availableDates: savedInterview.bookingDate },
        }
      );
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedInterview);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update Interview
 * @route   PUT /api/bookinginterviews/:id
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const updateInterview = async (req, res, next) => {
  // Connecting to mongoDB
  connectDB();

  try {
    const updatedInterview = await Interview.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedInterview);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete Interview
 * @route   POST /api/bookinginterviews/:id
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const deleteInterview = async (req, res, next) => {
  // Connecting to mongoDB
  connectDB();

  try {
    const deletedInterview = await Interview.findOneAndDelete(req.params.id);
    // Add the booking date to interviewer available dates after deleting the interview
    try {
      await User.findOneAndUpdate(
        { _id: deletedInterview.interviewer },
        {
          $push: { availableDates: deletedInterview.bookingDate },
        }
      );
    } catch (err) {
      next(err);
    }
    res.status(200).json("Interview has been removed");
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get a particular Interview
 * @route   GET /api/bookinginterviews/:id
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getInterview = async (req, res, next) => {
  // Connecting to mongoDB
  connectDB();

  try {
    const interview = await Interview.findById(req.params.id);
    res.status(200).json(interview);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all interviews of a User
 * @route   GET /api/bookinginterviews/user/:role/:userID
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getInterviews = async (req, res, next) => {
  // Connecting to mongoDB
  connectDB();

  const { role, userID } = req.params;
  const complete = !(req.query.complete === "false");
  try {
    const interviews =
      role === "s"
        ? await Interview.find({
            student: await User.find({ clerk_id: userID }).select("_id"),
            iscompleted: complete,
          })
            .populate("interviewer")
            .populate("mock_id")
        : await Interview.find({
            interviewer: await User.find({ clerk_id: userID }).select("_id"),
            iscompleted: complete,
          })
            .populate("student")
            .populate("mock_id");
    res.status(200).json(interviews);
  } catch (error) {
    next(error);
  }
};
