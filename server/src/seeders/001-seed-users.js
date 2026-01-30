import bcrypt from 'bcrypt'

export async function up({ context: queryInterface }) {
  const passwordAdmin = await bcrypt.hash('adminpass', 10)
  const passwordEmployee = await bcrypt.hash('employeepass', 10)

  return queryInterface.bulkInsert('users', [
    {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'admin@example.com',
      passwordHash: passwordAdmin,
      role: 'Admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '00000000-0000-0000-0000-000000000002',
      email: 'employee@example.com',
      passwordHash: passwordEmployee,
      role: 'Employee',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])
}

export async function down({ context: queryInterface }) {
  return queryInterface.bulkDelete('users', null, {})
}
