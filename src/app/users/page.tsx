// src/app/users/page.tsx
import UserList from "@/components/user-list";
import { User } from "@/lib/database";

export default async function UsersPage() {
  // Fetch dei dati lato server
  const users: User[] = await fetch("http://localhost:3000/api/users")
    .then((res) => res.json())
    .catch(() => []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <UserList users={users} />
    </div>
  );
}