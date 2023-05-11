// This function handles CRUD of User data.
import User from "../models/User.js";
import Interview from "../models/Bookinginterview.js";

export const createUser = async (req, res, next) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    next(err);
  }
};

// UPDATE User
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Deleting User
export const deleteUser = async (req, res, next) => {
  const mockId = req.params.mockid;
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

// GET User
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Get all Users
export const getUsers = async (req, res, next) => {
  try {
    // we can search using these queries
    // like
    //api/users?username='something'&email='something'
    const {
      username,
      name,
      email,
      phone,
      createdAt,
      updatedAt,
      _id,
      numericFilters,
      sort,
      fields,
    } = req.query;
    const queryObj = {};
    if (username) {
      queryObj.username = username;
    }
    if (name) {
      queryObj.name = name;
    }
    if (email) {
      queryObj.email = email;
    }
    if (phone) {
      queryObj.phone = phone;
    }
    if (createdAt) {
      queryObj.createdAt = createdAt;
    }
    if (updatedAt) {
      queryObj.updatedAt = updatedAt;
    }
    if (_id) {
      queryObj._id = _id;
    }

    // to search numberqueries like overall_score
    // we can search
    //api/users?numericFilters=overall_score>5 || <5 || we can use < <= = > >= operators

    if (numericFilters) {
      const operatorMap = {
        ">": "$gt",
        ">=": "$gte",
        "=": "$eq",
        "<": "$lt",
        "<=": "$lte",
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );
      const options = ["overall_score"];
      filters = filters.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");
        if (options.includes(field)) {
          queryObj[field] = { [operator]: Number(value) };
        }
      });
    }

    let result = User.find(queryObj);

    // to sort
    // /api/users?sort =name,-overall_score
    // sort
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result.sort(sortList);
    } else {
      result.sort("createdAt");
    }
    // fields
    //select only particular fields
    // /api/users?fields=name,email,-password

    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result.select(fieldsList);
    }
    // limit and skip
    // we can limit the documents using limit per page
    // /api/users?limit=4&page=2
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const users = await result;

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get the Interviews list associated for a user by student_id from BookingInterview model

export const getUserInterviews = async (req, res, next) => {
  try {
    const userInterviews = await Interview.find({
      student_id: req.params.id,
    });
    res.status(200).json(userInterviews);
  } catch (err) {
    next(err);
  }
};
