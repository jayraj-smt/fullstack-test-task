import path from 'path'
import { fileURLToPath } from 'url'
import { Umzug, SequelizeStorage } from 'umzug'
import sequelize from '../config/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const migrator = new Umzug({
  migrations: {
    glob: path.join(__dirname, '../migrations/*.js'),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
})

const direction = process.argv[2]

async function run() {
  if (direction === 'down') {
    const executed = await migrator.executed()
    if (executed.length === 0) {
      console.log('No migrations to revert.')
      return
    }
    await migrator.down()
    console.log('Reverted last migration.')
    return
  }

  await migrator.up()
  console.log('Migrations applied.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
