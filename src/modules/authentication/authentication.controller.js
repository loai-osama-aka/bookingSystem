import { Router } from "express";
import { login, signup } from "./authentication.service.js";
const router = Router();

//sign up
router.post("/signup", async (req, res) => {
  const response = await signup(req.body);
  res.json(response);
});

//login
router.post("/login", async (req, res) => {
  const response = await login(req.body);
  res.json(response);
});
export default router;
