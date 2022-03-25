const AuthError = require('../errors/auth-error');
const Users = require('../models/user');

const getUsers = async (req, res, next) => {
  try {
    const data = await Users.find();

    return res.send(data);
  } catch (error) {
    return next(error);
  }
};

// const updateUser = async (req, res, next) => {
//   try {
//     const { name, email } = req.body;

//     const user = await Users.findByIdAndUpdate(
//       req.user._id,
//       { name, email },
//       { new: true, runValidators: true },
//     );

//     // if (!user) {
//     //   return next(new NotFoundError('Запрашиваемый пользователь не найден'));
//     // }

//     return res.send(user);
//   } catch (error) {
//     return next(error);
//   }
// };

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await Users.create({
      name,
      email,
      password,
    });
    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email, password });

    if (!user) {
      return next(new AuthError('Неправильные почта или пароль'));
    }

    return res.send(user);
  } catch (error) {
    return next(error);
  }
};

module.exports = { getUsers, createUser, login };
