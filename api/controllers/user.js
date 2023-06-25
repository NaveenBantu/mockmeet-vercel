// This function handles CRUD of User data.
import User from "../models/User.js";

/**
 * @desc    Create new User
 * @route   POST /api/bookinginterviews
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const createUser = async (req, res, next) => {
  const { data } = req.body;
  const { first_name, last_name, id, image_url, email_addresses } = data;
  const email_addr = email_addresses[0].email_address;
  const isInterviewer = email_addr.includes("hashinsert");

  const userData = {
    clerk_id: id,
    name: `${first_name} ${last_name}`,
    email: email_addr,
    img: image_url,
    isInterviewer: isInterviewer,
  };

  const newUser = new User(userData);

  // Dynamically add available dates to interviewers (Note that this is not declared in the Schema)
  // if (isInterviewer) {
  //   newUser.set("availableDates", []);
  // }

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    // res.status(200).json("saved user");
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update User
 * @route   PUT /api/users/:id
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const updateUser = async (req, res, next) => {
  const { clerk_id, availableDates } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { clerk_id },
      { $push: { availableDates: availableDates } },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete User
 * @route   DELETE /api/users/:id
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const deleteUser = async (req, res, next) => {
  const { data } = req.body;
  const { deleted, id } = data;

  try {
    if (deleted) {
      const deletedUser = await User.findOneAndDelete({ clerk_id: id });
      res.status(200).json(deletedUser);
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get Users
 * @route   GET /api/users
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all Interviewers
 * Filter and send all the Users who are interviewers
 * @route   GET /api/users/interviewer
 * @access  Private
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getInterviewers = async (req, res, next) => {
  try {
    const interviewers = await User.find({ isInterviewer: true });
    res.status(200).json(interviewers);
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
// Currently handled in the bookinginterview controller
// export const getUserInterviews = async (req, res, next) => {
//   try {
//     let queryObj = {};
//     if (req.query.iscompleted) {
//       queryObj.iscompleted = req.query.iscompleted;
//     }
//     queryObj.student_id = req.params.id;
//     const userInterviews = await Interview.find(queryObj);
//     res.status(200).json(userInterviews);
//   } catch (err) {
//     next(err);
//   }
// };
