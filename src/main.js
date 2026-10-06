import express, { json } from "express";
import { env } from "./config/env.service.js";
import { databaseConnection } from "./database/connection.js";
import { globalErrorHandling } from "./common/exceptions/error.exception.js";
import authRouter from "./modules/authentication/authentication.controller.js";
import userRouter from "./modules/users/user.controller.js";
import bookingRouter from "./modules/booking/booking.controller.js";
const app = express();

app.use(json());
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/booking", bookingRouter);

app.use(globalErrorHandling);
databaseConnection(app, env.port);

app.listen(env.port, () =>
  console.log(`Example app listening at http://localhost:3000`),
);
