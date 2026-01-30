import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const {
  DB_HOST = 'localhost',
  DB_PORT = 5432,
  DB_NAME = 'tms_dev',
  DB_USER = 'postgres',
  DB_PASS = 'postgres',
  DB_SSL = 'false',
  DB_SSL_REJECT_UNAUTHORIZED = 'false',
  DB_SSL_CA = '',
  PORT = 4000,
  JWT_SECRET = 'please-change-me',
  JWT_EXPIRES_IN = '7d',
  NODE_ENV = 'development',
} = process.env

export default {
  db: {
    host: DB_HOST,
    port: Number(DB_PORT),
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    ssl: DB_SSL === 'true',
    sslRejectUnauthorized: DB_SSL_REJECT_UNAUTHORIZED === 'true',
    sslCa: DB_SSL_CA || null,
  },
  app: {
    port: Number(PORT),
    env: NODE_ENV,
  },
  jwt: {
    secret: JWT_SECRET,
    expiresIn: JWT_EXPIRES_IN,
  },
}
