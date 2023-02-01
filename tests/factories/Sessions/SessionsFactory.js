import { usersFactory } from "../Users/index.js";
import { database } from "../../../src/application/services/database/Database/index.js";

class SessionsFactory {
  async createSession(token) {
    const user = await usersFactory.createUser();

    return database.db.session.create({
      data: {
        token: token,
        userId: user.id
      }
    });
  }
}

export { SessionsFactory };
