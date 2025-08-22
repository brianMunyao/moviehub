import "../../../env-config";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const queryClient = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 5,
});

export const db = drizzle(queryClient, { schema });
