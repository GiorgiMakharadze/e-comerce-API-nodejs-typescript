import jwt from "jsonwebtoken";

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
