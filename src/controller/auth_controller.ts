import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { v4 } from "uuid";
import { create, findFirstByEmail } from "../repository/user_repository";
import { getErrorMessage } from "../util/error";
import { generateAccessToken, generateRefreshToken } from "../util/jwt";

const salt = genSaltSync(10);

export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    const user = await findFirstByEmail(email);

    if (!user)
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
      });

    if (!compareSync(password, user.password))
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: ReasonPhrases.UNAUTHORIZED,
      });

    const payload = {
      id: user.uuid,
      email: user.email,
      displayName: user.displayName,
    };

    res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
        user: payload,
      },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      errors: getErrorMessage(error),
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: errors.array(),
      });

    const { email, password } = req.body;

    const user = await create({
      uuid: v4(),
      email: email,
      password: hashSync(password, salt),
    });

    res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: user,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
      errors: getErrorMessage(error),
    });
  }
};

export const profile = async (req: Request, res: Response) => {};
