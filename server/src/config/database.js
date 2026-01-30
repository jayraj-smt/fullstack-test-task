import { Sequelize } from 'sequelize'
import config from './index.js'

const dialectOptions = {}

if (config.db.ssl) {
  dialectOptions.ssl = {
    require: true,
    // allow self-signed certs if the deploy does not provide a CA bundle
    rejectUnauthorized: !!config.db.sslRejectUnauthorized,
  }
  if (config.db.sslCa) dialectOptions.ssl.ca = config.db.sslCa
}

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: 'postgres',
    logging: config.app.env === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: Object.keys(dialectOptions).length
      ? dialectOptions
      : undefined,
  },
)

export default sequelize
