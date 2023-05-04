import Interview from "../models/Bookinginterview.js";
import Interviewer from "../models/Interviewer.js";

//create new interview
export const createInterview = async (req, res, next) => {
  const newInterview = new Interview(req.body);
  try {
    const savedInterview = await newInterview.save();
    // Delete the booked date from interviewer available dates
    try {
      await Interviewer.findOneAndUpdate(
        { _id: savedInterview.interviewer_id },
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
// update Interview
export const updateInterview = async (req, res, next) => {
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
export const deleteInterview = async (req, res, next) => {
  try {
    const deletedInterview = await Interview.findOneAndDelete(req.params.id);
    // Add the booking date to interviewer available dates after deleting the interview
    try {
      await Interviewer.findOneAndUpdate(
        { _id: deletedInterview.interviewer_id },
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
//Get Interview
export const getInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);
    res.status(200).json(interview);
  } catch (err) {
    next(err);
  }
};
// get all Interview
export const getInterviews = async (req, res, next) => {
  try {
    const interviews = await Interview.find();
    res.status(200).json(interviews);
  } catch (error) {
    next(error);
  }
};