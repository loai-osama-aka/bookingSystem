import { UnauthorizedException } from "../common/exceptions/error.exception.js";
import { env } from "../config/env.service.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  const [flag, token] = req.headers.authorization.split(" ");
  switch (flag) {
    case "Bearer":
      const payload = jwt.decode(token);
      let signature;
      switch (payload.aud) {
        case "admin":
          signature = env.adminAccessSignature;
          break;

        default:
          signature = env.userAccessSignature;
          break;
      }
      try {
        const decoded = jwt.verify(token, signature);
        console.log(decoded);
        req.user = decoded;
      } catch (error) {
        throw UnauthorizedException({ message: "Invalid token" });
      }
      break;

    default:
      break;
  }
  next();
};
