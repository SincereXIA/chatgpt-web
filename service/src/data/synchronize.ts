import 'reflect-metadata'
import process from 'process'
import { createConnection } from 'typeorm'
import { User } from './user'

async function createTable() {
  const connection = await createConnection({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
  })

  await connection.synchronize()

  globalThis.console.log('Users table created!')

  connection.close()
}

createTable()
