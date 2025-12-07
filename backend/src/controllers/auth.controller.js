import {
  forgotPasswordSchema,
  loginUserSchema,
  registerUserSchema,
  resendVerficationCodeSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../validators/auth.validator.js";
import apiError from "../utils/apiError.utils.js";
import apiResponse from "../utils/apiResponse.utils.js";
import { db } from "../utils/db.utils.js";
import bcrypt from "bcryptjs";
import sendMail from "../utils/sendMail.utils.js";
import {Role} from "../generated/prisma/index.js";
import  jwt  from "jsonwebtoken";

const sendOTP = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  await sendMail(otp);
  return otp.toString();
};

export const UserExist = async (req, res) => {
  try {
    const {email} = req.params;
    const user = await db.User.findUnique({
      where: {
        email,
      },
    })
    if(user){
      return res.status(200).json(new apiResponse(200, {isVerified: user.isVerified}, "User exist"));
    }
    throw new apiError(403, "User does not exist");
  } catch (error) {
    console.log(error.message);

     if (error instanceof apiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while checking the user",
      success: false,
    });
  

  }
}

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);
    const schemaCheck = registerUserSchema.safeParse(req.body);

    if (!schemaCheck.success) {
      throw new apiError(400, schemaCheck.error.issues[0].message);
    }

    const { username, email, password, dateOfBirth } = schemaCheck.data;

    const existingUser = await db.User.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new apiError(403, "User with this email already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = await sendOTP();
    console.log(verificationCode);
    
    const user = await db.User.create({
      data: {
        username,
        email,
        password: hashedPassword,
        dateOfBirth: new Date(dateOfBirth),
        role: Role.USER,
        isVerified: false,
        verificationCode,
        authProvider: AuthSource.LOCAL,
      },
    });

    res.status(201).json(
      new apiResponse(
        200,
        {
          username: user.username,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          authProvider: user.authProvider,
        },
        "User registered Successfully",
      ),
    );
  } catch (error) {
    console.log(error.message);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while registering the user",
      success: false,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const schemaResult = verifyUserSchema.safeParse(req.body);

    if (!schemaResult.success) {
      throw new apiError(400, schemaResult.error.issues[0].message);
    }

    const { email, userVerificationCode } = req.body;

    let user = await db.User.findUnique({
      where: {
        email,
      },
    });

    //verification code check

    if (user.verificationCode !== userVerificationCode) {
      throw new apiError(403, "Invalid verification code");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_IN },
    );

    user = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verificationCode: null,
      },
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res
      .status(200)
      .json(new apiResponse(200, {}, "User verified Successfully"));
  } catch (error) {
    console.log(error.message);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while verifying the user",
      success: false,
    });
  }
};

export const resendVerificationCode = async (req, res) => {
  try {
    const schemaCheck = resendVerficationCodeSchema.safeParse(req.body);

    if (!schemaCheck.success) {
      throw new apiError(400, schemaCheck.error.issues[0].message);
    }

    const { email } = req.body;

    const verificationCode = await sendOTP();

    const user = await db.User.update({
      where: {
        email,
      },
      data: {
        verificationCode,
      },
    });

    res
      .status(200)
      .json(new apiResponse(200, {}, "Verification Code resent successfully"));
  } catch (error) {
    console.log(error.message);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while resending the verification code",
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const schemaCheck = loginUserSchema.safeParse(req.body);

    if (!schemaCheck.success) {
      throw new apiError(400, schemaCheck.error.issues[0].message);
    }

    const { email, userPassword } = req.body;

    const user = await db.User.findUnique({
      where: {
        email,
      },
    });

    if (!user.isVerified) {
      throw new apiError(403, "Email is not verified");
    }

    const isPasswordCorrect = await bcrypt.compare(userPassword, user.password);

    if (!isPasswordCorrect) {
      throw new apiError(400, "Invalid credentials");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_IN },
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res
      .status(200)
      .json(new apiResponse(200, {
          username: user.username,
          email: user.email,
          role: user.role,
          isVerified: user.isVerified,
          authProvider: user.authProvider,
        }, "User log in successfull"));
  } catch (error) {
    console.log(error.message);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while user tries of log in",
      success: false,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const schemaCheck = forgotPasswordSchema.safeParse(req.body);

    if (!schemaCheck.success) {
      throw new apiError(400, schemaCheck.error.issues[0].message);
    }

    const { email } = req.body;

    const verificationCode = await sendOTP();

    const user = await db.User.update({
      where: {
        email,
      },
      data: {
        verificationCode,
      },
    });

    res
      .status(200)
      .json(new apiResponse(200, {}, "Verification code send Successfully"));
  } catch (error) {
    console.log(error.message);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while sending verification code",
      success: false,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const schemaCheck = resetPasswordSchema.safeParse(req.body);

    if (!schemaCheck.success) {
      throw new apiError(400, schemaCheck.error.issues[0].message);
    }

    const { email, userVerificationCode, newPassword, confirmPassword } =
      req.body;

    let user = await db.User.findUnique({
      where: {
        email,
      },
    });

    if (userVerificationCode !== user.verificationCode) {
      throw new apiError(400, "Invalid verification code");
    }

    if (newPassword !== confirmPassword) {
      throw new apiError(400, "new password and confirm password are not same");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user = await db.User.update({
      where: {
        id: user.id,
      },
      data: {
        verificationCode: null,
        password: hashedPassword,
      },
    });

    res
      .status(200)
      .json(new apiResponse(200, {}, "reset password Successfull"));
  } catch (error) {
    console.log(error.message);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while reseting user password",
      success: false,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json( new apiResponse(200, {}, "User logout successfully"))

  } catch (error) {
    console.log(error.message);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while logging out the user",
      success: false,
    });
  }
};

export const getUserData = async (req, res) => {
  try {
    res.status(200).json(new apiResponse(200, {
      username: req.user.username,
      email: req.user.email,
      avatar: req.user.avatar,
    }, "user data fetched succesfully"))
  } catch (error) {
    console.log(error.message);

    if (error instanceof apiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        message: error.message,
        success: false,
      });
    }
    return res.status(500).json({
      statusCode: 500,
      message: "Something went wrong while fetching user data",
      success: false,
    });
  }
}

export const checkAuth = async (req , res)=>{
    try {
        res.status(200).json({
            success:true,
            message:"User authenticated successfully",
            user:req.user
        });
    } catch (error) {
        console.error("Error checking user:", error);
        res.status(500).json({
            error:"Error checking user"
        })
    }
}
