import Interviews from "../models/Bookinginterview.js"

//create new interview
export const createInterview = async (req, res, next) => {
    const newInterview = new Interviews(req.body);
    try {
        const savedInterview = await newInterview.save();
        res.status(200).json(savedInterview);
    }
    catch (err) {
        next(err);
    }
}
// update interviews
export const updateInterviews = async (req, res, next) => {
    try {
        const updatedInterview = await Interviews.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedInterview);
    }
    catch (err) {
        next(err);
    }
};
export const deleteInterview = async (req, res, next) => {
    try {
        const deletedInterview = await Interviews.findOneAndDelete(req.params.id);
        res.status(200).json("Interview has been removed")
    }
    catch (err) {
        next(err);
    }
}
//Get Interview
export const getInterview = async (req, res, next) => {
    try {
        const interview = await Interviews.findById(req.params.id);
        res.status(200).json(interview);
    }
    catch (err) {
        next(err);
    }
}
// get all interviews
export const getInterviews = async (req, res, next) => {
    try {
        const interviews = await Interviews.find();
        res.status(200).json(interviews);
    } catch (error) {
        next(error);
    }
}