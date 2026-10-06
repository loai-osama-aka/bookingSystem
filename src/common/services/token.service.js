import { env } from "../../config/env.service.js";
import jwt from "jsonwebtoken";
export const generateToken = async (user) => {
  let signature;
  let aud;
  let refreshSignature;
  switch (user.role) {
    case "admin":
      signature = env.adminAccessSignature;
      refreshSignature = env.adminRefreshSignature;
      aud = "admin";
      break;

    default:
      signature = env.userAccessSignature;
      refreshSignature = env.userRefreshSignature;
      aud = "user";

      break;
  }

  const accessToken = jwt.sign({}, signature, {
    subject: user.id,
    // noTimestamp: true,
    expiresIn: "30mins",
    audience: aud,
  });

  const refreshToken = jwt.sign({}, refreshSignature, {
    subject: user.id,
    // noTimestamp: true,
    expiresIn: "1y",
    audience: aud,
  });
  console.log({ accessToken, refreshToken }, "from token.serivece");
  return { accessToken, refreshToken };
};
