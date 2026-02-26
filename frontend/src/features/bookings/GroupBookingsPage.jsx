import { useEffect, useState } from "react";
import { getGroupedBookings } from "@/shared/api/booking.api";

const GroupedBookingsPage = () => {
  const [grouped, setGrouped] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrouped = async () => {
      try {
        const data = await getGroupedBookings();
        setGrouped(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load grouped bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchGrouped();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Grouped Bookings (Owner)
        </h2>

        {grouped.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No bookings found.
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {user.userName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Total Bookings: {user.totalBookings}
                    </p>
                  </div>

                  <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                    {user.totalBookings} bookings
                  </div>
                </div>

                {/* Booking List */}
                <div className="border-t pt-4">
                  <ul className="space-y-2">
                    {user.bookings?.map((booking) => (
                      <li
                        key={booking._id}
                        className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg text-sm"
                      >
                        <span>
                          {new Date(
                            booking.startTime
                          ).toLocaleString()}
                        </span>
                        <span className="text-gray-400">→</span>
                        <span>
                          {new Date(
                            booking.endTime
                          ).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupedBookingsPage;