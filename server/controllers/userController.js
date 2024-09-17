import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import createHttpError from "http-errors";
import {
  authSchemaSignin,
  authSchemaLogin,
} from "../utils/validation_schema.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt_helper.js";
import client from "../utils/init_redis.js";

export const registerUser = async (req, res, next) => {
  try {
    const result = await authSchemaSignin.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });

    if (doesExist) {
      throw createHttpError.Conflict(
        `${result.email} is already been registered`
      );
    }

    const hashedPassword = await bcrypt.hash(result.password, 10);

    const user = {
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      password: hashedPassword,
    };

    const newUser = new User(user);
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "New user created",
      data: savedUser,
    });
  } catch (error) {
    if (error.isJoi === true) {
      error.status = 422;
    }

    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const result = await authSchemaLogin.validateAsync(req.body);

    const user = await User.findOne({ email: result.email });

    if (user == null) {
      throw createHttpError.NotFound("User not registered");
    }

    const { password: password, ...rest } = user._doc; // In Mongoose, user._doc is an internal property that holds the actual document data as a plain JavaScript object.

    if (await bcrypt.compare(result.password, user.password)) {
      try {
        const accessToken = signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res
          .cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
          })
          .json({
            success: true,
            message: "Successfully loged in",
            accessToken: accessToken,
            user: rest,
          });
      } catch (error) {
        console.log(error.message);
        // throw createHttpError.InternalServerError()
        res.status(500).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    } else {
      throw createHttpError.Unauthorized("Username or Password is not valid");
    }
  } catch (error) {
    if (error.isJoi === true) {
      return next(createHttpError.BadRequest("Invalid Username or Password"));
    }

    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    console.log("cookies:", req.cookies.jwt);

    const refreshToken = req.cookies.jwt;

    if (!refreshToken) {
      throw createHttpError.BadRequest();
    }

    try {
      const userId = await verifyRefreshToken(refreshToken);

      const newAccessToken = signAccessToken(user.id);
      const newRefreshToken = await signRefreshToken(userId);

      res
        .cookie("jwt", newRefreshToken, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .json({
          success: true,
          message: "Successfully Refreshed Tokens",
          accessToken: newAccessToken,
        });
    } catch (error) {
      console.log(error.message);
      next(error);
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.jwt;

    if (!refreshToken) throw createHttpError.BadRequest();

    const userId = await verifyRefreshToken(refreshToken);

    try {
      const val = await client.DEL(userId);
      res.clearCookie("jwt").sendStatus(204);
    } catch (error) {
      throw createHttpError.InternalServerError();
    }
  } catch (error) {
    // next(error)
    console.log("Logout error:", error);
    res,
      status(error.status || 500).json({
        success: false,
        message: error.message || "Internal server error",
      });
  }
};

export const google = async (req, res, next) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const { password: password, ...rest } = user._doc;

      try {
        const accessToken = signAccessToken(user.id);
        const refreshToken = await signRefreshToken(user.id);

        res
          .status(200)
          .cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          })
          .json({
            success: true,
            message: "Successfully Logged In",
            accessToken: accessToken,
            user: rest,
          });
      } catch (error) {
        next(error);
      }
    } else {
      let name = req.body.name;
      const [firstName, lastName] = name.split(" ");

      const randomPassword = Math.random.toString(36).slice(-8);

      try {
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const user = {
          firstName,
          lastName,
          email: req.body.email,
          password: hashedPassword,
        };

        const newUser = new User(user);
        const savedUser = await newUser.save();

        const { password: password, ...rest } = savedUser._doc;

        const accessToken = signAccessToken(savedUsr.id);
        const refreshToken = await signRefreshToken(savedUser.id);

        res
          .status(200)
          .cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          })
          .json({
            success: true,
            message: "User Created and Successfully Logged In",
            accessToken: accessToken,
            user: rest,
          });
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    console.log("error occured", error.message);
  }
};
