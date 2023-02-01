import { database } from "../../../src/application/services/database/Database/index.js";
import { faker } from "@faker-js/faker";

class TicketsFactory {
  async createTicketType() {
    return database.db.ticketType.create({
      data: {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: faker.datatype.boolean(),
        includesHotel: faker.datatype.boolean()
      }
    });
  }

  async createTicketTypeRemote() {
    return database.db.ticketType.create({
      data: {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: true,
        includesHotel: faker.datatype.boolean()
      }
    });
  }

  async createTicketTypeWithHotel() {
    return database.db.ticketType.create({
      data: {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        isRemote: false,
        includesHotel: true
      }
    });
  }

  async createTicket(enrollmentId, ticketTypeId, status) {
    return database.db.ticket.create({
      data: {
        enrollmentId,
        ticketTypeId,
        status
      }
    });
  }
}

export { TicketsFactory };