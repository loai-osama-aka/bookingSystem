import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "../../common/exceptions/error.exception.js";
import {
  compareHash,
  generateHash,
} from "../../common/security/encryption.security.js";
import { generateToken } from "../../common/services/token.service.js";
import { userModel } from "../../database/model/user.model.js";

export const signup = async (body) => {
  const { fullName, email, password, rePassword } = body;

  let exist = await userModel.findOne({ email });
  if (exist) {
    throw ConflictException({ message: "user already exist!" });
  }
  if (password !== rePassword) {
    return BadRequestException({
      message: "password and confirm password doesnot match",
    });
  }
  let hashedPassword = await generateHash({ plainText: password });
  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });
  console.log(user);
  return { message: "user added successfully", user };
};

//login api
export const login = async (body) => {
  const { email, password } = body;
  const user = await userModel.findOne({ email });
  if (!user) {
    throw NotFoundException();
  }
  const match = await compareHash(password, user.password);
  if (!match) {
    throw BadRequestException({ message: "email or password is  wrong" });
  }

  let { accessToken, refreshToken } = await generateToken(user);
  console.log(accessToken, refreshToken);

  return { message: "login successfully", accessToken, refreshToken };
};
