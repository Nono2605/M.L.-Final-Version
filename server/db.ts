
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { Pool as PgPool } from 'pg';
import ws from "ws";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Détection de l'environnement local
const isLocal = process.env.NODE_ENV !== 'production' || 
               process.env.DATABASE_URL?.includes('localhost') ||
               process.cwd().includes('ubuntu');

console.log(isLocal ? 'Using local PostgreSQL (no WebSocket)' : 'Using Neon WebSocket');

let pool: Pool | PgPool;
let db: ReturnType<typeof drizzle> | ReturnType<typeof drizzlePg>;

if (isLocal) {
  // Connexion PostgreSQL standard sans WebSocket
  pool = new PgPool({
    connectionString: process.env.DATABASE_URL,
    ssl: false
  });
  db = drizzlePg(pool, { schema });
} else {
  // Configuration Neon WebSocket pour la production
  neonConfig.webSocketConstructor = ws;
  neonConfig.useSecureWebSocket = true;
  
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  db = drizzle({ client: pool, schema });
}

export { pool, db };
