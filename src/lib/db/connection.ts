/**
 * Database Connection Utility
 * 
 * Provides MySQL connection with connection pooling for the Ice Star admin panel.
 * Uses mysql2/promise for async/await support.
 */

import mysql from 'mysql2/promise';

// Connection pool configuration
const poolConfig: mysql.PoolOptions = {
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3307', 10),
  database: process.env.DATABASE_NAME || 'istar',
  user: process.env.DATABASE_USER || 'istar_user',
  password: process.env.DATABASE_PASSWORD || 'istar_password',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  charset: 'utf8mb4',
};

// Create connection pool
let pool: mysql.Pool | null = null;

/**
 * Get database connection pool
 * Creates pool on first call, reuses on subsequent calls
 */
export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(poolConfig);
  }
  return pool;
}

/**
 * Get a connection from the pool
 * Use this for transactions or when you need a dedicated connection
 */
export async function getConnection(): Promise<mysql.PoolConnection> {
  const pool = getPool();
  return await pool.getConnection();
}

/**
 * Execute a query using the connection pool
 * Convenience method for simple queries
 */
export async function query<T extends mysql.RowDataPacket[] = mysql.RowDataPacket[]>(
  sql: string,
  values?: any[]
): Promise<[T, mysql.FieldPacket[]]> {
  const pool = getPool();
  return await pool.query<T>(sql, values);
}

/**
 * Close the connection pool
 * Call this when shutting down the application
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}
