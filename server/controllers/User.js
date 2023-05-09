const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const { StatusCodes } = require("http-status-codes");
const Login = async (req, res) => {
  var { email, password, role } = req.body;
  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please enter email and password" });
  }
  let currModel;
  if (role === "admin") {
    currModel = Admin;
  } else if (role == "doctor") {
    currModel = Doctor;
  } else {
    currModel = Patient;
  }
  const user = await currModel.findOne({ email: email });
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "User not found" });
  }

  const isCorrect = await user.checkPassword(password);

  if (isCorrect) {
    const token = user.generateAuthToken();
    res.status(StatusCodes.OK).json({ token });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: "Incorrect password" });
  }
};
const SignUp = async (req, res) => {
  const { role, user } = req.body;
  console.log(user);
  let currModel;
  if (role === "admin") {
    currModel = Admin;
  } else if (role === "doctor") {
    currModel = Doctor;
  } else {
    currModel = Patient;
  }
  const savedUser = await currModel.create({ ...user });

  if (savedUser) {
    const token = savedUser.generateAuthToken();
    res.status(StatusCodes.OK).json({ token });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "User not saved" });
  }
};
const updatePassword = async (req, res) => {
  const { role } = req.body;
  let currModel;
  if (role === "admin") {
    currModel = Admin;
  } else if (role === "doctor") {
    currModel = Doctor;
  } else {
    currModel = Patient;
  }
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  const user = await currModel.findById(id);
  const isCorrect = await user.checkPassword(oldPassword);
  if (isCorrect) {
    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({ user });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Incorrect password" });
  }
};

module.exports = { Login, SignUp, updatePassword };
