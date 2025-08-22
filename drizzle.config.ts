import "dotenv/config";
import "./env-config";

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/configs/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  verbose: true, // Print all statements
});
