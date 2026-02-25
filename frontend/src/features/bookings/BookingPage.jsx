import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../auth/AuthContext";
import {
  getBookings,
  createBooking,
  deleteBooking
} from "../../api/booking.api";

export default function BookingPage() {
  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  //reusable loader
  const loadBookings = useCallback(async () => {
    if (!user?._id) return;

    try {
      setLoading(true);
      const res = await getBookings(user._id);
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings:", err);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  //  load when user changes
  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  if (!user) {
    return (
      <div className="p-6 text-white">
        Please login first
      </div>
    );
  }

  // create booking
  const handleCreate = async () => {
    if (!title || !date) {
      alert("All fields required");
      return;
    }

    try {
      await createBooking({ title, date }, user._id);
      setTitle("");
      setDate("");
      await loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  //  delete booking
  const handleDelete = async (id) => {
    try {
      await deleteBooking(id, user._id);
      await loadBookings();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="p-6 text-white space-y-6">
      <h2 className="text-2xl font-bold">
        Bookings ({user.role})
      </h2>

      {/* USER CREATE FORM */}
      {user.role === "USER" && (
        <div className="space-y-2">
          <input
            className="px-3 py-2 bg-slate-800 w-full"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="date"
            className="px-3 py-2 bg-slate-800 w-full"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button
            className="px-4 py-2 bg-emerald-600"
            onClick={handleCreate}
          >
            Create Booking
          </button>
        </div>
      )}

      {/* LOADING */}
      {loading && <div>Loading...</div>}

      {/* BOOKINGS LIST */}
      <div className="space-y-3">
        {bookings.map((b) => {
          const ownerId =
            typeof b.createdBy === "object"
              ? b.createdBy._id
              : b.createdBy;

          return (
            <div
              key={b._id}
              className="flex justify-between items-center bg-slate-800 p-3"
            >
              <div>
                <div>{b.title}</div>
                <div className="text-sm text-gray-400">
                  {b.date}
                </div>
              </div>

              {(user.role === "ADMIN" ||
                ownerId === user._id) && (
                <button
                  className="px-3 py-1 bg-red-600"
                  onClick={() => handleDelete(b._id)}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}

        {!loading && bookings.length === 0 && (
          <div className="text-gray-400">
            No bookings found.
          </div>
        )}
      </div>
    </div>
  );
}