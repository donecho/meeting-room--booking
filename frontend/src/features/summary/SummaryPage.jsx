import { useEffect, useState } from "react";
import { getBookingSummary } from "@/shared/api/booking.api";

const SummaryPage = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getBookingSummary();
        setSummary(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
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
          Booking Summary
        </h2>

        {summary.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No bookings found.
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="min-w-full text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    User
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Total Bookings
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Total Hours
                  </th>
                </tr>
              </thead>

              <tbody>
                {summary.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.userName}
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                        {item.totalBookings}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                        {item.totalHours} hrs
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;