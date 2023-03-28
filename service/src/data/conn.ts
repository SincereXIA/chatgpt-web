import type { DataSource } from 'typeorm'
import { createConnection } from 'typeorm'
import { User } from './user'
import * as process from "process";
import * as dotenv from 'dotenv'
let globalConnection

const init = async (): Promise<DataSource> => {
  if (!globalConnection) {
    globalConnection = await createConnection({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
    })
  }
  return globalConnection
}

async function getConnection() {
  await init()
  return globalConnection
}

function closeConnection() {
  if (globalConnection)
    globalConnection.close()
}

export { getConnection, closeConnection }
