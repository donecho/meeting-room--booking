import { useState } from "react";
import { createBooking } from "@/shared/api/booking.api";
import { useAuth } from "@/features/auth/auth.context";

export default function BookingModal({ onClose, refetch }) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    startTime: "",
    endTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.startTime || !form.endTime) {
      setError("Both fields are required");
      return;
    }

    if (new Date(form.startTime) >= new Date(form.endTime)) {
      setError("Start time must be before end time");
      return;
    }

    try {
      setLoading(true);

      await createBooking({
        ...form,
        userId: user?._id, // frontend hack
      });

      refetch();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to create booking"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6">

        {/* Header */}
        <h3 className="text-xl font-semibold mb-2">
          Create Booking
        </h3>

        {/* User Name */}
        <p className="text-sm text-gray-600 mb-4">
          User: <span className="font-medium text-gray-800">
            {user?.name || "Unknown User"}
          </span>
        </p>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-3 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">
              Start Time
            </label>
            <input
              type="datetime-local"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.startTime}
              onChange={(e) =>
                setForm({ ...form, startTime: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={form.endTime}
              onChange={(e) =>
                setForm({ ...form, endTime: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}