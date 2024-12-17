import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: "sqlite",
  schema: "libs/schemas/src/+(*.schema).ts",
  out: 'apps/server/src/db/drizzle',
  dbCredentials: {
    url: 'apps/server/src/db/db.sqlite'
  },
  verbose: true,
  strict: true
})
