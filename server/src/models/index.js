import sequelize from '../config/database.js'
import defineUser from './user.js'
import defineShipment from './shipment.js'

const db = {}

db.sequelize = sequelize
db.User = defineUser(sequelize)
db.Shipment = defineShipment(sequelize)

export default db
