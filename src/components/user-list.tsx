// src/components/user-list.tsx
import { User } from "@/lib/database";

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2 p-2 border rounded">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}