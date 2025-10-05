import { MongoClient } from 'mongodb';
import pg from 'pg';

const { Pool } = pg;

// MongoDB connection (Banco de Relatos - Write-Only)
let mongoClient = null;
let mongoDb = null;

export async function connectMongoDB() {
  try {
    if (mongoClient) {
      return mongoDb;
    }

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI not defined in environment variables');
    }

    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
    mongoDb = mongoClient.db();
    
    console.log('✅ MongoDB connected (Banco de Relatos)');
    return mongoDb;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export function getMongoDb() {
  if (!mongoDb) {
    throw new Error('MongoDB not connected. Call connectMongoDB() first.');
  }
  return mongoDb;
}

// PostgreSQL connection (Banco Agregado - Read-Only)
let postgresPool = null;

export async function connectPostgres() {
  try {
    if (postgresPool) {
      return postgresPool;
    }

    postgresPool = new Pool({
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Test connection
    const client = await postgresPool.connect();
    await client.query('SELECT NOW()');
    client.release();

    console.log('✅ PostgreSQL connected (Banco Agregado)');
    return postgresPool;
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error);
    throw error;
  }
}

export function getPostgresPool() {
  if (!postgresPool) {
    throw new Error('PostgreSQL not connected. Call connectPostgres() first.');
  }
  return postgresPool;
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing database connections...');
  if (mongoClient) {
    await mongoClient.close();
  }
  if (postgresPool) {
    await postgresPool.end();
  }
  process.exit(0);
});
