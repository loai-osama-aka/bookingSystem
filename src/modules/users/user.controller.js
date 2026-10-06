import { Router } from "express";
import { auth } from "../../middleware/auth.middleware.js";
import { getUserById } from "./user.service.js";
const router = Router();

//sign up
router.get("/get-user-by-id", auth, async (req, res) => {
  const response = await getUserById(req.user.sub);
  res.json(response);
});

export default router;
