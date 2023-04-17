import { Response } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export const createJWT = ({
  payload,
}: {
  payload: { [key: string]: any };
}): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_LIFETIME!,
  });

  return token;
};

export const isTokenValid = ({ token }: { token: string }) =>
  jwt.verify(token, process.env.JWT_SECRET!);

export const attachCookiesToResponse = ({
  res,
  user,
}: {
  res: Response;
  user: any;
}) => {
  const token = createJWT({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
  });

  res.status(StatusCodes.CREATED).json({ user });
};
