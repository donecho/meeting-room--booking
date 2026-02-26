import { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "@/shared/api/booking.api";
import BookingModal from "./BookingModal";
import { useAuth } from "@/features/auth/auth.context";
import { formatBookingDateTimeRange } from "@/shared/utils/dateUtils";

export default function BookingsPage() {
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  /* ===============================
     FETCH
  =============================== */
  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(Array.isArray(data) ? data : []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /* ===============================
     DELETE
  =============================== */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      await deleteBooking(id);
      fetchBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  /* ===============================
     HELPERS
  =============================== */
  const getBookingUserId = (booking) => {
    if (!booking?.userId) return null;

    return typeof booking.userId === "object"
      ? booking.userId._id
      : booking.userId;
  };

  const isOwnBooking = (booking) => {
    const bookingUserId = getBookingUserId(booking);
    return (
      String(bookingUserId) === String(user?._id) ||
      String(bookingUserId) === String(user?.id)
    );
  };

  const canDelete = (booking) => {
    if (!user) return false;

    // Admin & Owner can delete all bookings
    if (user.role === "admin" || user.role === "owner") {
      return true;
    }

    //  Normal user can delete only own booking
    return isOwnBooking(booking);
  };

  const resolveUserName = (booking) => {
    if (isOwnBooking(booking)) {
      return user?.name || "You";
    }

    if (typeof booking.userId === "object") {
      return booking.userId.name;
    }

    return "Other User";
  };

  /* ===============================
     RENDER
  =============================== */
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Bookings List</h2>

        {/* Admin cannot create booking */}
        {user?.role !== "admin" && (
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Booking
          </button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {resolveUserName(booking)} |{" "}
                  {formatBookingDateTimeRange(
                    booking.startTime,
                    booking.endTime
                  )}
                </p>
              </div>

              {/* Role-based delete */}
              {canDelete(booking) && (
                <button
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {open && user?.role !== "admin" && (
        <BookingModal
          onClose={() => setOpen(false)}
          refetch={fetchBookings}
        />
      )}
    </div>
  );
}