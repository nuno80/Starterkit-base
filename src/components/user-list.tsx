// src/components/user-list.tsx
import { User } from "@/lib/database";

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2 rounded border p-2">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
