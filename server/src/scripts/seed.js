import path from 'path'
import { fileURLToPath } from 'url'
import { Umzug, SequelizeStorage } from 'umzug'
import sequelize from '../config/database.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const seeder = new Umzug({
  migrations: {
    glob: path.join(__dirname, '../seeders/*.js'),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, modelName: 'seeder_meta' }),
  logger: console,
})

async function run() {
  await seeder.up()
  console.log('Seeders applied.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
