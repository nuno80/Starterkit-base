// lib/database.ts
import Database from "better-sqlite3";

const db = new Database("mydatabase.db");

// Crea la tabella utenti (se non esiste già)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )
`);

// Definisci i tipi per gli utenti
export interface User {
  id: number;
  name: string;
  email: string;
}

// Funzione per ottenere tutti gli utenti
export function getAllUsers(): User[] {
  const stmt = db.prepare("SELECT * FROM users");
  return stmt.all() as User[]; // Forza il tipo di ritorno
}

// Funzione per inserire un nuovo utente
export function insertUser(name: string, email: string): { id: number } {
  const stmt = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");
  const result = stmt.run(name, email);
  return { id: result.lastInsertRowid as number };
}

// Funzione per ottenere un utente per ID
export function getUserById(id: number): User | undefined {
  const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
  return stmt.get(id) as User | undefined; // Forza il tipo di ritorno
}

// Funzione per eliminare un utente per ID
export function deleteUserById(id: number): void {
  const stmt = db.prepare("DELETE FROM users WHERE id = ?");
  stmt.run(id);
}