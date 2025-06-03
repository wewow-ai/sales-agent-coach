// app/admin/users/[userId]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Role } from "@prisma/client";

type EditableUser = {
  id: string;
  name: string | null;
  email: string | null;
  role: Role;
};

export default function EditUserPage() {
  const { userId } = useParams(); // This is where we access the userId from the URL
  const router = useRouter();
  const [user, setUser] = useState<EditableUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return; // In case userId is not yet available

      const res = await fetch(`/api/admin/users/${userId}`);
      if (!res.ok) {
        console.error("User not found or API failed");
        return router.push("/admin/users");
      }

      const data = await res.json();
      setUser(data);
      setLoading(false);
    };
    fetchUser();
  }, [userId, router]);

  const handleSave = async () => {
    const res = await fetch(`/api/admin/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (res.ok) {
      router.push("/admin/users");
    } else {
      alert("Failed to update user");
    }
  };

  if (loading || !user) return <p>Loading...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>

      <label className="block mb-2 font-medium">Name</label>
      <input
        type="text"
        value={user.name ?? ""}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Email</label>
      <input
        type="email"
        value={user.email ?? ""}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Role</label>
      <select
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value as Role })}
        className="w-full border p-2 rounded mb-6"
      >
        {Object.values(Role).map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={() => router.push("/admin/users")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
