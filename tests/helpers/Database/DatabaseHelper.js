import { database } from "../../../src/application/services/database/Database/index.js";

class DatabaseHelper {
  async clean() {
    await database.db.address.deleteMany({});
    await database.db.payment.deleteMany({});
    await database.db.ticket.deleteMany({});
    await database.db.enrollment.deleteMany({});
    await database.db.event.deleteMany({});
    await database.db.session.deleteMany({});
    await database.db.user.deleteMany({});
    await database.db.ticketType.deleteMany({});
    await database.db.room.deleteMany({});
    await database.db.hotel.deleteMany({});
  }
}

export { DatabaseHelper };
