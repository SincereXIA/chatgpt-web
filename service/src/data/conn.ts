import type { DataSource } from 'typeorm'
import { createConnection } from 'typeorm'
import { User } from './user'

let globalConnection

const init = async (): Promise<DataSource> => {
  if (!globalConnection) {
    globalConnection = await createConnection({
      type: 'mysql',
      host: 'bj-cynosdbmysql-grp-0oq1pf7e.sql.tencentcdb.com',
      port: 25144,
      username: 'chatbot',
      password: 'Zhx981007star.',
      database: 'chatbot',
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
