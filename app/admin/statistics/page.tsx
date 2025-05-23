"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DateStat = { date: string; count: number };
type UserStat = { userId: string; nameOrEmail: string; count: number };

export default function StatisticsPage() {
  const [dateData, setDateData] = useState<DateStat[]>([]);
  const [userData, setUserData] = useState<UserStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/statistics")
      .then((res) => res.json())
      .then((data) => {
        setDateData(data.recordingsByDate);
        setUserData(data.recordingsByUser);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Recording Statistics</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-2">Recordings Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>

          <h2 className="text-xl font-semibold mt-8 mb-2">
            Recordings by User
          </h2>
          <table className="min-w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">User ID</th>
                <th className="px-4 py-2 border">Name or Email</th>
                <th className="px-4 py-2 border">Recordings</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((u) => (
                <tr key={u.userId}>
                  <td className="px-4 py-2 border">{u.userId}</td>
                  <td className="px-4 py-2 border">{u.nameOrEmail}</td>
                  <td className="px-4 py-2 border text-center">{u.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
