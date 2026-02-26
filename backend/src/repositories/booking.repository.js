import Booking from "../models/Booking.js";

/* =========================
   CREATE BOOKING
========================= */

export const createBookingRepo = (data) => {
  return Booking.create(data);
};


/* =========================
   GET ALL BOOKINGS (ADMIN / OWNER)
========================= */

export const getAllBookingsRepo = () => {
  const now = new Date();

  return Booking.find({
    endTime: { $gt: now }
  })
    .populate("userId", "name")
    .sort({ createdAt: -1 });
};


/* =========================
   GET BOOKINGS BY USER (USER)
========================= */

export const getBookingsByUserRepo = (userId) => {
  const now = new Date();

  return Booking.find({
    userId,
    endTime: { $gt: now } 
  }).sort({ createdAt: -1 });
};


/* =========================
   FIND BOOKING BY ID
========================= */

export const findBookingByIdRepo = (id) => {
  return Booking.findById(id);
};


/* =========================
   DELETE BOOKING BY ID
========================= */

export const deleteBookingRepo = (id) => {
  return Booking.findByIdAndDelete(id);
};


/* =========================
   CHECK IF USER HAS ANY BOOKINGS
   (Used for Preventing User Deletion)
========================= */

export const findBookingByUserRepo = (userId) => {
  return Booking.findOne({ userId });
};


/* =========================
   CHECK OVERLAPPING BOOKING
========================= */

export const findOverlappingBookingRepo = (start, end) => {
  return Booking.findOne({
    startTime: { $lt: end },
    endTime: { $gt: start }
  });
};


/* =========================
   GROUP BOOKINGS BY USER (OWNER / ADMIN)
========================= */

export const getBookingsGroupedByUserRepo = () => {
  return Booking.aggregate([
    {
      $group: {
        _id: "$userId",
        bookings: { $push: "$$ROOT" },
        totalBookings: { $sum: 1 }
      }
    },
    {
      $sort: { totalBookings: -1 }
    }
  ]);
};


/* =========================
   SUMMARY (TOTAL BOOKINGS PER USER)
========================= */

export const getBookingSummaryRepo = () => {
  return Booking.aggregate([
    {
      $group: {
        _id: "$userId",
        totalBookings: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "users",        // MongoDB collection name
        localField: "_id",   
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $project: {
        _id: 1,
        userName: "$user.name",  
        totalBookings: 1
      }
    },
    {
      $sort: { totalBookings: -1 }
    }
  ]);
};