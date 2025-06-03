// app/admin/users/create/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";

export default function CreateUserPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>(Role.SALES_AGENT); // Default role
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name || !email) {
      alert("Name and email are required");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, role }),
    });

    if (res.ok) {
      router.push("/admin/users");
    } else {
      alert("Failed to create user");
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New User</h1>

      <label className="block mb-2 font-medium">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Role</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as Role)}
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
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create User"}
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
