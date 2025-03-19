# Integrazione di `better-sqlite3` in un Progetto Next.js

Questa guida spiega come integrare `better-sqlite3` in un progetto Next.js, utilizzando TypeScript e Tailwind CSS. Segui i passaggi per configurare il database, creare API routes e visualizzare i dati in una pagina.

---

## Prerequisiti

1. **Node.js** installato (versione 16 o superiore).
2. Un progetto Next.js configurato con TypeScript e Tailwind CSS.
3. Conoscenza di base di Next.js, TypeScript e SQLite.

---

## Passo 1: Configurazione del Progetto

### 1.1 Creazione del Progetto Next.js

Se non hai già un progetto Next.js, creane uno nuovo con TypeScript:

```bash
npx create-next-app@latest my-nextjs-app --typescript
cd my-nextjs-app
```

### 1.2 Installazione di `better-sqlite3`

Installa `better-sqlite3` e i tipi TypeScript:

```bash
npm install better-sqlite3
npm install --save-dev @types/better-sqlite3
```

---

## Passo 2: Configurazione del Database

### 2.1 Creazione del File `lib/database.ts`

Crea una cartella `lib` nella root del progetto e aggiungi un file `database.ts` per gestire la connessione al database:

```typescript
// lib/database.ts
import Database from 'better-sqlite3';

const db = new Database('mydatabase.db');

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
  const stmt = db.prepare('SELECT * FROM users');
  return stmt.all() as User[];
}

// Funzione per inserire un nuovo utente
export function insertUser(name: string, email: string): { id: number } {
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  const result = stmt.run(name, email);
  return { id: result.lastInsertRowid as number };
}

// Funzione per ottenere un utente per ID
export function getUserById(id: number): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as User | undefined;
}

// Funzione per eliminare un utente per ID
export function deleteUserById(id: number): void {
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  stmt.run(id);
}
```

---

## Passo 3: Creazione delle API Routes

### 3.1 Creazione dell'API Route `pages/api/users.ts`

Crea un'API route per gestire le richieste relative agli utenti:

```typescript
// pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers, insertUser, User } from '../../lib/database';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = getAllUsers();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    try {
      const result = insertUser(name, email);
      res.status(201).json({ id: result.id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to insert user' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
```

---

## Passo 4: Creazione della Pagina `users`

### 4.1 Creazione della Pagina `src/app/users/page.tsx`

Crea una pagina per visualizzare l'elenco degli utenti:

```tsx
// pages/users.tsx
import { NextPage } from 'next';
import UserList from '../components/user-list';
import { User } from '../lib/database';

interface UsersPageProps {
  users: User[];
}

const UsersPage: NextPage<UsersPageProps> = ({ users }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <UserList users={users} />
    </div>
  );
};

export default UsersPage;

// Fetch dei dati lato server
export async function getServerSideProps() {
  try {
    const { getAllUsers } = await import('../lib/database');
    const users = getAllUsers();

    return {
      props: {
        users,
      },
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      props: {
        users: [],
      },
    };
  }
}
```

### 4.2 Creazione del Componente `components/user-list.tsx`

Crea un componente per visualizzare l'elenco degli utenti:

```tsx
// components/user-list.tsx
import { User } from '../lib/database';

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
```

---

## Passo 5: Test del Sistema

### 5.1 Avvio del Server

Avvia il server Next.js:

```bash
npm run dev
```

Visita `http://localhost:3000/users` per vedere l'elenco degli utenti.

### 5.2 Inserimento di Utenti di Esempio

Puoi inserire utenti di esempio utilizzando `curl`:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Mario Rossi", "email": "mario@example.com"}'
```

Ripeti il comando per aggiungere altri utenti.

---

## Passo 6: Struttura del Progetto

Ecco la struttura finale del progetto:

```
my-nextjs-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── users/
│   │   │       └── route.ts
│   │   ├── users/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── lib/
│   │   └── database.ts
│   └── components/
│       └── user-list.tsx
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---



