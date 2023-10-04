import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { create } from "../repository/user_repository";
import { genSaltSync, hashSync } from "bcryptjs";
import { v4 } from "uuid";
import { getErrorMessage } from "../util/error";

const salt = genSaltSync(10);

export const login = async (req: Request, res: Response) => {};

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
        errors: getErrorMessage(error)
    });
  }
};

export const profile = async (req: Request, res: Response) => {};
