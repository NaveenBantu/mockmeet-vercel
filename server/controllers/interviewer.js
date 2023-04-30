// This function handles CRUD of Interviewer data.
import Interviewer from "../models/Interviewer.js";
import Mock from "../models/Mock.js";

export const createInterviewer = async (req, res, next) => {
  const newInterviewer = new Interviewer(req.body);

  try {
    const savedInterviewer = await newInterviewer.save();
    // Update Mock with the interviewer
    try {
      newInterviewer.interviewTypes.map(async ({ mockType }) => {
        await Mock.findOneAndUpdate(
          { type: mockType },
          {
            $push: { interviewers: savedInterviewer._id },
          }
        );
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedInterviewer);
  } catch (err) {
    next(err);
  }
};

// UPDATE Interviewer
export const updateInterviewer = async (req, res, next) => {
  try {
    const updatedInterviewer = await Interviewer.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedInterviewer);
  } catch (err) {
    next(err);
  }
};

export const updateInterviewerAvailability = async (req, res, next) => {
  try {
    await Interviewer.updateOne(
      { "interviewTypes._id": req.params.id },
      {
        $push: {
          "interviewTypes.$.availableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Interviewer availability has been updated.");
  } catch (err) {
    next(err);
  }
};

// Deleting Interviewer
export const deleteInterviewer = async (req, res, next) => {
  const mockId = req.params.mockid;
  try {
    const deletedInterviewer = await Interviewer.findByIdAndDelete(
      req.params.id
    );
    try {
      deletedInterviewer.interviewTypes.map(async ({ mockType }) => {
        await Mock.findOneAndUpdate(
          { type: mockType },
          {
            $pull: { interviewers: deletedInterviewer._id },
          }
        );
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Interviewer has been deleted.");
  } catch (err) {
    next(err);
  }
};

// GET Interviewer
export const getInterviewer = async (req, res, next) => {
  try {
    const interviewer = await Interviewer.findById(req.params.id);
    res.status(200).json(interviewer);
  } catch (err) {
    next(err);
  }
};

// Get all Interviewers
export const getInterviewers = async (req, res, next) => {
  try {
    const interviewers = await Interviewer.find();
    res.status(200).json(interviewers);
  } catch (err) {
    next(err);
  }
};
