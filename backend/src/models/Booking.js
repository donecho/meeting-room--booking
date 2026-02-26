import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    startTime: {
      type: Date,
      required: true
    },

    endTime: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);
bookingSchema.index({ startTime: 1, endTime: 1 });
bookingSchema.index({ userId: 1 });

export default mongoose.model("Booking", bookingSchema);