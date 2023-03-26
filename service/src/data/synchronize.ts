import 'reflect-metadata'
import { createConnection } from 'typeorm'
import { User } from './user'

async function createTable() {
  const connection = await createConnection({
    type: 'mysql',
    host: 'bj-cynosdbmysql-grp-0oq1pf7e.sql.tencentcdb.com',
    port: 25144,
    username: 'chatbot',
    password: 'Zhx981007star.',
    database: 'chatbot',
    entities: [User],
  })

  await connection.synchronize()

  globalThis.console.log('Users table created!')

  connection.close()
}

createTable()
