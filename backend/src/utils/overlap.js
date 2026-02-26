export const createBookingService = async (body, user) => {
  const { startTime, endTime } = body;

  if (!startTime || !endTime) {
    throw new AppError("startTime and endTime are required", 400);
  }

  const start = new Date(startTime);
  const end = new Date(endTime);
  const now = new Date();

  if (start >= end) {
    throw new AppError("startTime must be before endTime", 400);
  }

  if (start < now) {
    throw new AppError("Cannot create booking in the past", 400);
  }

  const overlapping = await Booking.findOne({
    startTime: { $lt: end },
    endTime: { $gt: start }
  });

  if (overlapping) {
    throw new AppError(
      "Booking time overlaps with existing booking",
      409
    );
  }

  return Booking.create({
    userId: user._id,
    startTime: start,
    endTime: end
  });
};