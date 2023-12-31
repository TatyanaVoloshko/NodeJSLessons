const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

async function register(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user !== null) {
      return res.status(409).send({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: passwordHash });

    res.status(201).send({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (user === null) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch !== true) {
      return res
        .status(401)
        .send({ message: "Email or password is incorrect" });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
      );
      
      await User.findByIdAndUpdate(user._id, { token });

    return res.status(200).send({ token: token });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
    try {
        await User.findByIdAndUpdate(req.user.id, { token: null });

        res.send({ message: "You are successfully logged out" });
    } catch (error) {
        next(error);
    }
  
}

module.exports = {
  register,
  login,
  logout,
};
