import { randomUUID } from "node:crypto";
import { Environment } from "vitest/environments";
import "dotenv/config";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);
  return url.toString();
}

export default <Environment>{
  name: "prisma-test-env",
  transformMode: "ssr",
  async setup() {
    // Setup the environment
    console.log("Setting up Prisma test environment");
    const schema = randomUUID();
    const databaseUrl = generateDatabaseUrl(schema);

    process.env.DATABASE_URL = databaseUrl;

    execSync(`npx prisma migrate deploy`);

    return {
      async teardown() {
        // Teardown the environment
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE;`
        );
        await prisma.$disconnect();
        console.log("Closing Prisma client");
        console.log("Tearing down Prisma test environment");
      },
    };
  },
};
