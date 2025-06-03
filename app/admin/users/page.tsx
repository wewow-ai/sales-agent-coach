// app/admin/users/page.tsx
"use client";

import { useEffect, useState } from "react";
import { User, Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UsersDashboard() {
  const { data: session, status } = useSession(); // 'session' is now used for conditional rendering/redirects
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    // Optional: if only admins can see this dashboard
    if (status === "authenticated" && session?.user?.role !== "ADMIN") {
      router.push("/"); // Redirect non-admins away
    }
  }, [status, router, session]); // <-- Added 'router' and 'session'

  useEffect(() => {
    const fetchUsers = async () => {
      // Only fetch if session is authenticated and user is ADMIN
      if (status === "authenticated" && session?.user?.role === "ADMIN") {
        const res = await fetch("/api/admin/users");
        const data = await res.json();
        setUsers(data);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [status, session]); // <-- Added 'status' and 'session'

  const handleRoleChange = async (userId: string, newRole: Role) => {
    // 'handleRoleChange' is now used in the JSX below
    await fetch(`/api/admin/users/${userId}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  if (loading) return <p>Loading...</p>;

  // Optional: Render loading or access denied state if not admin
  if (status === "authenticated" && session?.user?.role !== "ADMIN") {
    return <p>Access Denied. You do not have permission to view this page.</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name}</td>
              <td className="p-2 text-blue-600 underline">
                <Link href={`/admin/users/${user.id}`}>{user.email}</Link>
              </td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                {/* Example UI to use handleRoleChange */}
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleRoleChange(user.id, e.target.value as Role)
                  }
                  className="border p-1 rounded"
                >
                  {Object.values(Role).map((roleOption) => (
                    <option key={roleOption} value={roleOption}>
                      {roleOption}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
