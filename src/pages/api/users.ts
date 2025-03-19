// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from "next";

import { getAllUsers, insertUser } from "../../lib/database";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const users = getAllUsers();
    res.status(200).json(users);
  } else if (req.method === "POST") {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    try {
      const result = insertUser(name, email);
      res.status(201).json({ id: result.id });
    } catch {
      res.status(500).json({ error: "Failed to insert user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
