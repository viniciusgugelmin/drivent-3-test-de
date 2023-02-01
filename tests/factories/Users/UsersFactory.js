import { database } from "../../../src/application/services/database/Database/index.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sessionsFactory } from "../Sessions/index.js";

class UsersFactory {
  async createUser(params = {}) {
    const incomingPassword = params.password || faker.internet.password(6);
    const hashedPassword = await bcrypt.hash(incomingPassword, 10);

    return database.db.user.create({
      data: {
        email: params.email || faker.internet.email(),
        password: hashedPassword
      }
    });
  }

  async generateValidToken(user) {
    const incomingUser = user || (await this.createUser());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

    await sessionsFactory.createSession(token);

    return token;
  }
}

export { UsersFactory };
