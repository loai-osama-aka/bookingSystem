import { Router } from "express";
import { auth } from "../../middleware/auth.middleware.js";
import {
  createBooking,
  deleteBookingById,
  getBooking,
  getBookingById,
  updateBookingById,
} from "./booking.service.js";
const router = Router();

// create booking
router.post("/create-booking", auth, async (req, res) => {
  const response = await createBooking(req.body, req.user.sub);
  res.json(response);
});

//get all
router.get("/get-booking", auth, async (req, res) => {
  const response = await getBooking(req.user.sub);
  res.json(response);
});
// get by id book
router.get("/get-booking-by-id/:id", auth, async (req, res) => {
  const response = await getBookingById(req.params);
  res.json(response);
});
//update
router.patch("/update-booking-by-id/:id", auth, async (req, res) => {
  const response = await updateBookingById(req.body, req.params);
  res.json(response);
});

//delete
router.delete("/delete-booking-by-id/:id", auth, async (req, res) => {
  const response = await deleteBookingById(req.params);
  res.json(response);
});
export default router;
