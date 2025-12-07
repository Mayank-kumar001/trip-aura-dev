import apiError from "../utils/apiError.utils.js";
import  jwt  from "jsonwebtoken";
import { db } from "../utils/db.utils.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;
    console.log(req.cookie)
       
    if (!accessToken) {
        
      throw new apiError(403, "unauthorized User");
    }

    const decodedToken = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );


   

    const user = await db.User.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: {
        id: true,
        avatar: true,
        username: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new apiError(401, "User not found");
    }

    req.user = user;

    next();
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
      message: "unauthorized user",
      success: false,
    });
  }
};
