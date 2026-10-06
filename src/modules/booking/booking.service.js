import {
  BadRequestException,
  NotFoundException,
} from "../../common/exceptions/error.exception.js";
import { bookingModel } from "../../database/model/booking.model.js";
import { userModel } from "../../database/model/user.model.js";
//create
export const createBooking = async (body, id) => {
  const user = await userModel.findById(id);
  if (!user) {
    throw NotFoundException({ message: "user not found" });
  }

  const { title, bookingDate, status } = body;
  const booking = await bookingModel.create({
    title,
    bookingDate,
    status,
    userId: user._id,
  });
  return { message: "booking created", booking };
};

//get bookings
export const getBooking = async (id) => {
  const booking = await bookingModel.find({ userId: id });
  if (!booking) {
    throw NotFoundException();
  }
  return { message: "done", booking };
};

export const getBookingById = async (bookingId) => {
  const { id } = bookingId;

  const booking = await bookingModel.findById(id);
  if (!booking) {
    throw NotFoundException();
  }
  return { booking };
};

export const updateBookingById = async (body, bookingId) => {
  const { title, bookingDate } = body;
  const { id } = bookingId;
  const booking = await bookingModel.findById(id);
  console.log(booking);

  if (!booking) {
    throw NotFoundException();
  }
  if (booking.status == "cancelled") {
    throw BadRequestException({ message: "cant update cancelled book" });
  }
  const updated = await bookingModel.findByIdAndUpdate(
    id,
    { title, bookingDate },
    { new: true },
  );

  console.log(updated, "update");

  return { message: "updated", updated };
};

//deleteBookingById
export const deleteBookingById = async (bookingId) => {
  const { id } = bookingId;

  const booking = await bookingModel.findById(id);
  console.log(booking);

  if (!booking) {
    throw NotFoundException();
  }
  if (booking.status == "cancelled") {
    const deleted = await bookingModel.findByIdAndDelete(id);
    return { message: "deleted", deleted };
  }
};
