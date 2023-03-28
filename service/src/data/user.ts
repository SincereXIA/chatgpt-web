import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { getConnection } from './conn'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 50 })
  name: string

  @Column({ type: 'varchar', length: 50 })
  password: string

  @Column({ type: 'varchar', length: 100 })
  nickName: string
}

async function getUserRepository() {
  const connection = await getConnection()
  return connection.getRepository(User)
}

export { getUserRepository }
