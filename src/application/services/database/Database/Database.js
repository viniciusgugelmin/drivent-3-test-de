import pkg from "@prisma/client";

export class Database {
  db;

  constructor() {
    const { PrismaClient } = pkg;
    this.db = new PrismaClient();
  }

  async disconnect() {
    await this.db.$disconnect();
  }
}
