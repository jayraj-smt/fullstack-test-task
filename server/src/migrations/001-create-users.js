import { DataTypes } from 'sequelize'

export async function up({ context: queryInterface }) {
  // enable pgcrypto for gen_random_uuid
  await queryInterface.sequelize.query(
    'CREATE EXTENSION IF NOT EXISTS pgcrypto;',
  )

  return queryInterface.createTable('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: queryInterface.sequelize.literal('gen_random_uuid()'),
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Admin', 'Employee'),
      allowNull: false,
      defaultValue: 'Employee',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: queryInterface.sequelize.literal('now()'),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: queryInterface.sequelize.literal('now()'),
    },
  })
}

export async function down({ context: queryInterface }) {
  await queryInterface.dropTable('users')
}
