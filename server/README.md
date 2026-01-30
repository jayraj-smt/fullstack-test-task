# TMS Backend POC

Backend prototype for Transportation Management System (TMS)

## Quickstart (local via docker)

1. Copy `.env.sample` to `.env` and adjust values if needed.
2. Start postgres and app (dev mode):

   docker-compose up --build

3. In a separate terminal, run migrations and seed (if not auto-run):

   npm run migrate
   npm run seed

4. Open GraphQL Playground at `http://localhost:4000`

## Default users (seeded)

- Admin: admin@example.com / adminpass
- Employee: employee@example.com / employeepass

## Helpful scripts

- `npm run dev` - start server with nodemon
- `npm run migrate` - run DB migrations
- `npm run seed` - run seeders
- `npm run init:db` - migrate and seed

## Notes

- Uses Umzug for migrations and seeders (ES modules)
- GraphQL API via Apollo Server
- JWT authentication (see `login` mutation)
