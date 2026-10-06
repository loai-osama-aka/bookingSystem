import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(`./.env.dev`) });
const port = process.env.PORT;
const saltRounds = process.env.SALT_ROUNDS;
const databaseUri = process.env.DATABASE_URI;
const mood = process.env.MOOD;

const adminAccessSignature = process.env.ADMIN_ACCESS_SIGNATURE;
const userAccessSignature = process.env.USER_ACCESS_SIGNATURE;
const adminRefreshSignature = process.env.ADMIN_REFRESH_SIGNATURE;
const userRefreshSignature = process.env.USER_REFRESH_SIGNATURE;

export const env = {
  port,
  databaseUri,
  saltRounds,
  mood,
  adminAccessSignature,
  userAccessSignature,
  adminRefreshSignature,
  userRefreshSignature,
};
