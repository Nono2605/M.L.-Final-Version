
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

// Détection de l'environnement local
const isLocal = process.env.NODE_ENV !== 'production' || 
               process.env.DATABASE_URL?.includes('localhost') ||
               process.cwd().includes('ubuntu');

if (isLocal) {
  // Désactiver complètement WebSocket en local
  neonConfig.webSocketConstructor = undefined;
  neonConfig.wsProxy = undefined;
  neonConfig.useSecureWebSocket = false;
  
  // Forcer connexion TCP classique
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
} else {
  // WebSocket seulement en production
  neonConfig.webSocketConstructor = ws;
  neonConfig.useSecureWebSocket = true;
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Configuration de connexion adaptée à l'environnement
const poolConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false }
};

export const pool = new Pool(poolConfig);
export const db = drizzle({ client: pool, schema });
